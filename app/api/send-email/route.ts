import sgMail from '@sendgrid/mail';
import { NextResponse } from 'next/server';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  try {
    let { userEmail, emailTemplate, dynamicData, attachments } = await req.json();

    if (!userEmail || !emailTemplate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const templateId = getTemplateId(emailTemplate);
    if (!templateId) {
      return NextResponse.json(
        { error: 'Invalid email template' },
        { status: 400 }
      );
    }

    // Handle notification email for job applications
    if (emailTemplate === 'job_application_notification') {
      userEmail = 'uptechincorp@gmail.com'; // Now this works
    }

    const emailAttachments =
      attachments && attachments.length > 0
        ? attachments.map((attachment: { content: string; filename: string; type: string; disposition: string }) => ({
            content: attachment.content,
            filename: attachment.filename,
            type: attachment.type,
            disposition: attachment.disposition,
          }))
        : [];

    await sendUserEmail({
      userEmail,
      templateId,
      dynamicData,
      attachments: emailAttachments,
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}


const sendUserEmail = async ({
  userEmail,
  templateId,
  dynamicData,
  attachments,
}: {
  userEmail: string;
  templateId: string;
  dynamicData?: Record<string, any>;
  attachments?: Array<{
    content: string;
    filename: string;
    type: string;
    disposition: string;
  }>;
}) => {
  const mailOptions = {
    from: {
      email: process.env.ADMIN_EMAIL!,
      name: 'Uptech Incorp',
    },
    to: userEmail,
    templateId,
    dynamic_template_data: dynamicData || {},
    attachments, // Include attachments in the email payload
  };

  await sgMail.send(mailOptions);
};

const getTemplateId = (template: string): string => {
  switch (template) {
    case 'acceptance':
      return 'd-40dd972478374dbba1543f6c24ebf782';
    case 'rejection':
      return 'd-6dc1e114e902406781b1bc623a64e5ff';
    case 'post_interview_rejection':
      return 'd-97e7f632b72a46b68e00b78bb210434e';
    case 'awaiting_review':
      return 'd-930fd93582b64fdeb8c696b422f77d97';
    case 'job_application_notification': 
      return 'd-4eaa748b0b9c4e8d8cc892ce2cb42515'; 
    default:
      return '';
  }
};
