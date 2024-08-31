const cron = require('node-cron');
const emailService = require('../services/email-service');
const { sendBasicEmail } = require('../services/email-service');
const setupJobs = ()=>{
    cron.schedule(
        '*/2 * * * *',async()=>{
           const response = await emailService.fetchPendingEmails();
           console.log(response);
           response.forEach((email)=>{sendBasicEmail(
            '"Support" ReminderService@airlien.com',
             email.recepientEmail,
             email.subject,
             email.content,
             email.id
           )})
        }
    )
}
module.exports = setupJobs;