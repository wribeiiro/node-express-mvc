const httpStatus = require('../enum/httpStatus');

const data = {
    employees: require('../model/employees.json'),
    setEmployees: (data) => this.employees = data
}

const getAllEmployees = (request, response) => {
    response.status(httpStatus.HTTP_OK).json({
        data: data.employees,
        message: 'OK',
        status: httpStatus.HTTP_OK
    });
}

const createNewEmployee = (request, response) => {
    const newEmployee = {
        id: data.employees?.length ? data.employees[data.employees.length - 1].id + 1 : 1,
        firstname: request.body.firstname,
        lastname: request.body.lastname
    }

    if (!newEmployee.firstname || !newEmployee.lastname) {
        return response.status(httpStatus.HTTP_BAD_REQUEST).json({
            data: null,
            message: 'First and last names are required.',
            status: httpStatus.HTTP_BAD_REQUEST,
        });
    }

    data.setEmployees([...data.employees, newEmployee]);
    response.status(httpStatus.HTTP_CREATED).json(data.employees);
}

const updateEmployee = (request, response) => {
    const employee = data.employees.find(emp => emp.id === parseInt(request.body.id));

    if (!employee) {
        return response.status(httpStatus.HTTP_BAD_REQUEST).json({
            data: null,
            message: `Employee ID ${request.body.id} not found`,
            status: httpStatus.HTTP_BAD_REQUEST,
        });
    }

    if (request.body.firstname) {
        employee.firstname = request.body.firstname;
    }

    if (request.body.lastname) {
        employee.lastname = request.body.lastname;
    }

    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(request.body.id));
    const unsortedArray = [...filteredArray, employee];

    data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

    response.status(httpStatus.HTTP_OK).json({
        data: data.employees,
        message: 'OK',
        status: httpStatus.HTTP_OK
    });
}

const deleteEmployee = (request, response) => {
    const employee = data.employees.find(emp => emp.id === parseInt(request.body.id));

    if (!employee) {
        return response.status(httpStatus.HTTP_BAD_REQUEST).json({
            data: null,
            message: `Employee ID ${request.body.id} not found`,
            status: httpStatus.HTTP_BAD_REQUEST,
        });
    }

    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(request.body.id));
    data.setEmployees([...filteredArray]);

    response.status(httpStatus.HTTP_OK).json({
        data: data.employees,
        message: 'OK',
        status: httpStatus.HTTP_OK
    });
}

const getEmployee = (request, response) => {
    const employee = data.employees.find(emp => emp.id === parseInt(request.params.id));

    if (!employee) {
        return response.status(httpStatus.HTTP_BAD_REQUEST).json({
            data: null,
            message: `Employee ID ${request.params.id} not found`,
            status: httpStatus.HTTP_BAD_REQUEST
        });
    }

    response.status(httpStatus.HTTP_OK).json({
        data: employee,
        message: 'OK',
        status: httpStatus.HTTP_OK
    });
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}