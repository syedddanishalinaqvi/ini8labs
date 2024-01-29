import { Registration } from "../model/register.model.js";
import { body, validationResult } from 'express-validator';

//Validation rules while adding and updating
const validationRules = [
    body('Name', 'Enter a valid Name').isLength({ min: 3 }),
    body('Email', 'Enter a valid Email').custom(async(value)=>{
        const checkValue= await Registration.findOne({where:{Email:value}});
        if(checkValue){
            return Promise.reject("Email Already Exist")
        };
    }),
    body('DateOfBirth').isISO8601().toDate(),
    body('Phone').isMobilePhone().withMessage('Enter a valid phone number'),
    body('Address', 'Too short value for an address').isString().isLength({ min: 8 }),
];

//New Registration
const createController = async (req, res) => {
    try {
        const { Name, Email, DateOfBirth, Phone, Address } = req.body;
        await Promise.all(validationRules.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        else{
        const registration = await Registration.create({ Name, Email, DateOfBirth, Phone, Address });
        res.status(200).json({
            message: "Registered Successfully",
            data: registration
        });
    }
    } catch (err) {
        console.error('Error creating record:', err);
        res.status(500).send('Internal Server Error');
    }
}

//Get all records
const getAllController = async (req, res) => {
    try {
        const registrations = await Registration.findAll();
        res.status(200).json({ data: registrations });
    } catch (err) {
        console.error('Error reading records:', err);
        res.status(500).send('Internal Server Error');
    }
}

//Update particular record with id
const updateController = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Address, Phone, DateOfBirth, Email } = req.body;
        const updateValidation=validationRules.map((rule)=>{
            return rule.optional();
        })
        await Promise.all(updateValidation.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const registration = await Registration.findByPk(id);
        if (!registration) {
            return res.status(404).json({message:'Record not found'});
        }
        await registration.update({ Name, Address, Phone, DateOfBirth, Email });
        res.status(200).json(registration);
    } catch (err) {
        console.error('Error updating record:', err);
        res.status(500).send('Internal Server Error');
    }
}

//Delete particular record with id
const deleteController = async (req, res) => {
    try {
        const { id } = req.params;
        const registration = await Registration.findByPk(id);
        if (!registration) {
            return res.status(404).json({message:'Record not found'});
        }
        await registration.destroy();
        res.status(200).json({
            message:'Record deleted successfully',
            deletedDate:registration}
            );
    } catch (err) {
        console.error('Error deleting record:', err);
        res.status(500).send('Internal Server Error');
    }
}

export { createController, getAllController, deleteController, updateController };