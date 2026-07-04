import React from "react";
import ApplicationDetailsModal from "@/components/ApplicationDetailsModal";
import { Application } from "@/types/dashboard";
import { DevelopersClubApplication } from "@/lib/types/developersClub";
import { Timestamp } from "firebase/firestore";

interface ApplicationTableProps {
  applications: Application[] | DevelopersClubApplication[];
  handleApplicationUpdate: (id: string, status: string, reason: string) => void;
  onApplicationClick: (
    application: Application | DevelopersClubApplication
  ) => void;
  applicationType: "job" | "devClub";
}

const ApplicationTable: React.FC<ApplicationTableProps> = ({
  applications,
  handleApplicationUpdate,
  onApplicationClick,
  applicationType,
}) => {
  const [selectedApplication, setSelectedApplication] =
    React.useState<Application | DevelopersClubApplication | null>(null);

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-accent/20 text-accent-ink";
    }
  };

  const formatDate = (dateApplied: Date | Timestamp | undefined) => {
    if (dateApplied instanceof Timestamp) {
      return dateApplied.toDate().toLocaleDateString();
    }
    return "Date not available";
  };

  const viewApplication = (
    application: Application | DevelopersClubApplication
  ) => {
    setSelectedApplication(application);
    onApplicationClick(application);
  };

  return (
    <div>
      {/* Mobile card layout */}
      <div className="md:hidden divide-y divide-line">
        {applications.map((application) => (
          <div
            key={application.id}
            onClick={() => viewApplication(application)}
            className="p-4 hover:bg-mist cursor-pointer transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-ink">
                  {application.firstName} {application.lastName}
                </p>
                {applicationType === "job" ? (
                  <p className="text-sm text-ink-soft mt-0.5">
                    {(application as Application).position || "N/A"}
                  </p>
                ) : (
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-brand/10 text-brand">
                    {(application as DevelopersClubApplication).interestType ===
                    "app"
                      ? "App Dev"
                      : (application as DevelopersClubApplication)
                            .interestType === "web"
                        ? "Web Dev"
                        : "N/A"}
                  </span>
                )}
              </div>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClasses(
                  application.status || "pending"
                )}`}
              >
                {application.status || "pending"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <p className="text-ink-soft text-xs font-semibold uppercase tracking-wider">
                  Email
                </p>
                <p className="text-ink truncate">{application.email}</p>
              </div>
              <div>
                <p className="text-ink-soft text-xs font-semibold uppercase tracking-wider">
                  Contact
                </p>
                <p className="text-ink">{application.contactNumber}</p>
              </div>
              <div>
                <p className="text-ink-soft text-xs font-semibold uppercase tracking-wider">
                  Date
                </p>
                <p className="text-ink">
                  {formatDate(application.dateApplied)}
                </p>
              </div>
              <div>
                <p className="text-ink-soft text-xs font-semibold uppercase tracking-wider">
                  Resume
                </p>
                {application.resumeFileUrl ? (
                  <a
                    href={application.resumeFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-brand font-medium hover:underline"
                  >
                    View
                  </a>
                ) : (
                  <p className="text-ink-soft">N/A</p>
                )}
              </div>
              {applicationType === "job" && (
                <div className="col-span-2">
                  <p className="text-ink-soft text-xs font-semibold uppercase tracking-wider">
                    Portfolio
                  </p>
                  <div className="flex gap-3">
                    {(application as Application).portfolioFileUrl && (
                      <a
                        href={(application as Application).portfolioFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-brand font-medium hover:underline"
                      >
                        File
                      </a>
                    )}
                    {(application as Application).portfolioUrl && (
                      <a
                        href={(application as Application).portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-brand font-medium hover:underline"
                      >
                        Website
                      </a>
                    )}
                    {!(application as Application).portfolioFileUrl &&
                      !(application as Application).portfolioUrl && (
                        <p className="text-ink-soft">N/A</p>
                      )}
                  </div>
                </div>
              )}
              {applicationType === "devClub" && (
                <div>
                  <p className="text-ink-soft text-xs font-semibold uppercase tracking-wider">
                    Hours/Week
                  </p>
                  <p className="text-ink">
                    {(application as DevelopersClubApplication).weeklyHours ===
                    "more"
                      ? "MORE"
                      : (application as DevelopersClubApplication).weeklyHours
                        ? `${(application as DevelopersClubApplication).weeklyHours}h`
                        : "N/A"}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table layout */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-mist border-b border-line">
              <th className="px-6 py-3 text-left text-ink-soft text-xs font-semibold uppercase tracking-wider">
                First Name
              </th>
              <th className="px-6 py-3 text-left text-ink-soft text-xs font-semibold uppercase tracking-wider">
                Last Name
              </th>
              {applicationType === "job" ? (
                <th className="px-6 py-3 text-left text-ink-soft text-xs font-semibold uppercase tracking-wider">
                  Position
                </th>
              ) : (
                <>
                  <th className="px-6 py-3 text-left text-ink-soft text-xs font-semibold uppercase tracking-wider">
                    Interest
                  </th>
                  <th className="px-6 py-3 text-left text-ink-soft text-xs font-semibold uppercase tracking-wider">
                    Hours/Week
                  </th>
                </>
              )}
              <th className="px-6 py-3 text-left text-ink-soft text-xs font-semibold uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-ink-soft text-xs font-semibold uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-ink-soft text-xs font-semibold uppercase tracking-wider">
                Resume
              </th>
              {applicationType === "job" && (
                <th className="px-6 py-3 text-left text-ink-soft text-xs font-semibold uppercase tracking-wider">
                  Portfolio
                </th>
              )}
              <th className="px-6 py-3 text-left text-ink-soft text-xs font-semibold uppercase tracking-wider">
                Date Applied
              </th>
              <th className="px-6 py-3 text-left text-ink-soft text-xs font-semibold uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {applications.map((application) => (
              <tr
                key={application.id}
                onClick={() => viewApplication(application)}
                className="bg-paper hover:bg-mist cursor-pointer transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-ink">
                    {application.firstName}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-ink">
                    {application.lastName}
                  </span>
                </td>
                {applicationType === "job" ? (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-ink">
                      {(application as Application).position || "N/A"}
                    </span>
                  </td>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-brand/10 text-brand">
                        {(application as DevelopersClubApplication)
                          .interestType === "app"
                          ? "App Dev"
                          : (application as DevelopersClubApplication)
                                .interestType === "web"
                            ? "Web Dev"
                            : "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-ink">
                        {(application as DevelopersClubApplication)
                          .weeklyHours === "more"
                          ? "MORE"
                          : (application as DevelopersClubApplication)
                                .weeklyHours
                            ? `${(application as DevelopersClubApplication).weeklyHours}h`
                            : "N/A"}
                      </span>
                    </td>
                  </>
                )}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-ink">
                    {application.contactNumber}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-ink">{application.email}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {application.resumeFileUrl ? (
                    <a
                      href={application.resumeFileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm text-brand font-medium hover:underline"
                    >
                      Resume
                    </a>
                  ) : (
                    <span className="text-sm text-ink-soft">N/A</span>
                  )}
                </td>
                {applicationType === "job" && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      {(application as Application).portfolioFileUrl && (
                        <a
                          href={(application as Application).portfolioFileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm text-brand font-medium hover:underline"
                        >
                          Portfolio
                        </a>
                      )}
                      {(application as Application).portfolioUrl && (
                        <a
                          href={(application as Application).portfolioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm text-brand font-medium hover:underline"
                        >
                          Website
                        </a>
                      )}
                      {!(application as Application).portfolioFileUrl &&
                        !(application as Application).portfolioUrl && (
                          <span className="text-sm text-ink-soft">N/A</span>
                        )}
                    </div>
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-ink">
                    {formatDate(application.dateApplied)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClasses(
                      application.status || "pending"
                    )}`}
                  >
                    {application.status || "pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedApplication && (
        <ApplicationDetailsModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onUpdateStatus={handleApplicationUpdate}
          isDevClubApplication={applicationType === "devClub"}
        />
      )}
    </div>
  );
};

export default ApplicationTable;
