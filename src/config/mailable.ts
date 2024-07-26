import nodemailer from 'nodemailer';

class MailConfig {
    private transporter: nodemailer.Transporter;
    private companyName: string | undefined;
    private companyLogo: string | undefined;
    private from: string | undefined;

    constructor() {
        // Initialize mailer configuration
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST || '',
            port: parseInt(process.env.SMTP_PORT || '0', 10),
            secure: process.env.SMTP_SECURE === 'true', // Convert to boolean
            auth: {
                user: process.env.MAIL_USERNAME || '',
                pass: process.env.MAIL_PASSWORD || '',
            },
        });

        // Additional company details
        this.companyName = process.env.COMPANY_NAME || '';
        this.companyLogo = process.env.COMPANY_LOGO_URL || '';
        this.from = process.env.FROM_EMAIL || '';
    }

    getTransporter(): nodemailer.Transporter {
        return this.transporter;
    }

    // Method to get company name
    getCompanyName(): string | undefined {
        return this.companyName;
    }

    // Method to get company logo URL
    getCompanyLogo(): string | undefined {
        return this.companyLogo;
    }

    // Method to get from address
    getFromAddress(): string | undefined {
        return this.from;
    }
}

const mailConfig = new MailConfig();
export default mailConfig;
