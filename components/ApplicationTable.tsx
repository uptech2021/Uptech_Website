import React from "react";
import ApplicationDetailsModal from "@/components/ApplicationDetailsModal";
import { Application } from "@/types/dashboard";
import { DevelopersClubApplication } from "@/lib/types/developersClub";
import { Timestamp } from "firebase/firestore";

interface ApplicationTableProps {
  applications: Application[] | DevelopersClubApplication[];
  handleApplicationUpdate: (id: string, status: string, reason: string) => void;
  onApplicationClick: (application: Application | DevelopersClubApplication) => void;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  const viewApplication = (application: Application | DevelopersClubApplication) => {
    setSelectedApplication(application);
    onApplicationClick(application);
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow w-full">
      <div className="min-w-screen bg-gray-100">
        <div className="w-full">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  FirstName
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  LastName
                </th>
                {applicationType === "job" ? (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                ) : (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Interest
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hours/Week
                    </th>
                  </>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resume
                </th>
                {applicationType === "job" && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Portfolio
                  </th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Applied
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((application) => (
                <tr
                  key={application.id}
                  onClick={() => viewApplication(application)}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {application.firstName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {application.lastName}
                    </div>
                  </td>
                  {applicationType === "job" ? (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {(application as Application).position || "N/A"}
                      </div>
                    </td>
                  ) : (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                            {(application as DevelopersClubApplication).interestType === "app" 
                              ? "App Dev" 
                              : (application as DevelopersClubApplication).interestType === "web" 
                              ? "Web Dev" 
                              : "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {(application as DevelopersClubApplication).weeklyHours === "more" 
                            ? "MORE" 
                            : (application as DevelopersClubApplication).weeklyHours 
                            ? `${(application as DevelopersClubApplication).weeklyHours}h` 
                            : "N/A"}
                        </div>
                      </td>
                    </>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {application.contactNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {application.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {application.resumeFileUrl ? (
                      <a
                        href={application.resumeFileUrl}
                        target="_blank"
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                      >
                        <i className="fas fa-file-alt mr-2"></i>Resume
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  {applicationType === "job" && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-2">
                        {(application as Application).portfolioFileUrl ? (
                          <a
                            href={(application as Application).portfolioFileUrl}
                            target="_blank"
                            className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs"
                          >
                            <i className="fas fa-file-alt mr-2"></i>Portfolio
                          </a>
                        ) : (
                          ""
                        )}
                        {(application as Application).portfolioUrl ? (
                          <a
                            href={(application as Application).portfolioUrl}
                            target="_blank"
                            className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs"
                          >
                            <i className="fas fa-external-link-alt mr-2"></i>
                            Website
                          </a>
                        ) : (
                          ""
                        )}
                        {!(application as Application).portfolioFileUrl &&
                        !(application as Application).portfolioUrl
                          ? "N/A"
                          : ""}
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {application.dateApplied instanceof Timestamp
                        ? application.dateApplied.toDate().toLocaleDateString()
                        : "Date not available"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        application.status
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
