const sender = require('../config/emailConfig');
const TicketRepository = require('../repository/ticket-repository');
const repo = new TicketRepository();
const sendBasicEmail = async(mailFrom,mailTo,mailSubject,mailBody,mailId)=>{
  try {
    const response = await sender.sendMail({
      from : mailFrom,
      to : mailTo,
      subject : mailSubject,
      text : mailBody
    },async(err,data)=>{
       if(err){
        console.error(err);
       }
       else{
          repo.update(mailId,{status:"SUCCESS"});
       }
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

const fetchPendingEmails = async() => {
  try{
    const response = await repo.get({status : "PENDING"}); 
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

const createNotification = async(data)=>{
  try {
    console.log(data);
    const response = await repo.create(data);
    return response;
  } catch (error) {
     console.log(error);
     throw error;
  }
}


module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification
}