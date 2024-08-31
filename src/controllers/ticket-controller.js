const TicketService = require('../services/email-service');
const create = async(req, res)=>{
    try {
        const notificationTime = new Date(req.body.notificationTime*1000);
        const data = {...req.body, notificationTime}
        const response = await TicketService.createNotification(data);
        return res
        .status(201)
        .json(
            {
              message : "Successfully Created the ticket",
              success : true,
              data : response,
              err : {}
            }
        )
    } catch (error) {
        return res
        .status(500)
        .json(
            {
              message : "Failed to Created the ticket",
              success : false,
              data : {},
              err : {error}
            }
        )
    }
}

module.exports ={
    create
}