import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { BASE_URL } from "../../config"

export default function UserAddSidebar(props) {
    const [isADoctor, setIsADoctor] = useState(false);
    const [phone, setPhone] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        role: '',
        departmentname: ''
    });

    const [errors, setErrors] = useState({
        name: false,
        email: false,
        mobile: false,
        company: false,
        departmentname: false,
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));

        if (id === 'role') {
            setIsADoctor(value === 'doctor');
        }
    };

    const handleSubmit = async () => {
        const newErrors = {
            name: !formData.name,
            email: !formData.email,
            mobile: !phone.slice(2),
            role: !formData.role,
            departmentname: isADoctor && !formData.departmentname
        };
        setErrors(newErrors);

        if (Object.values(newErrors).some((error) => error)) {
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/api/authorization/addusers`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('admin$token')}`,
                },
                body: JSON.stringify({
                    name: formData.name,
                    mobile: phone.slice(2),
                    email: formData.email,
                    role: formData.role,
                    departmentname: formData.departmentname,
                }),
            });

            if (!response.ok) throw new Error('Failed to add user');
            const data = await response.json();
            
            props.setUsers((prevUsers) => [
                ...prevUsers,
                {
                    name: formData.name,
                    mobile: phone.slice(2),
                    email: formData.email,
                    role: formData.role,
                    departmentname: formData.departmentname,
                    additiontime: new Date().toLocaleString()
                },
            ]);
            
            handleClose();
            props.setToast({
                type: 'success',
                title: 'User Added Successfully',
                message: `Login details sent to ${formData.email}`,
            });
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleClose = () => {
        props.setOpenModal(false);
        setFormData({
            name: '',
            email: '',
            mobile: '',
            role: '',
            departmentname: ''
        });
        setPhone('');
        setErrors({
            name: false,
            email: false,
            mobile: false,
            company: false,
            departmentname: false,
        });
    };

    return (
        <>
            {props.openModal && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-40 z-50" onClick={handleClose}></div>
                    <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg z-50 transform transition-transform duration-300">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg font-semibold">Add New User</h3>
                            <button className="text-gray-500 hover:text-gray-700" onClick={handleClose}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <form className="p-6 overflow-y-auto h-[calc(100%-64px)]">
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="John Snow"
                                    className="form-input w-full p-2 text-gray-400 rounded-md border"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">Name is required</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="form-input w-full p-2 rounded-md border"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="role">Role</label>
                                <select
                                    id="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className="form-input w-full p-2 rounded-md border"
                                >
                                    <option value="">Select Role</option>
                                    <option value="admin">Administrator</option>
                                    <option value="doctor">Doctor</option>
                                    <option value="fdo">Front Desk Operator</option>
                                    <option value="deo">Data Entry Operator</option>
                                </select>
                                {errors.role && <p className="text-red-500 text-sm mt-1">Role is required</p>}
                            </div>
                            {isADoctor && (
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2" htmlFor="departmentname">Department</label>
                                    <select
                                        id="departmentname"
                                        value={formData.departmentname}
                                        onChange={handleInputChange}
                                        className="form-input w-full p-2 rounded-md border"
                                    >
                                        <option value="">Select Department</option>
                                        <option value="cardiology">Cardiology</option>
                                        <option value="neurology">Neurology</option>
                                        <option value="oncology">Oncology</option>
                                        <option value="orthopedics">Orthopedics</option>
                                        <option value="pediatrics">Pediatrics</option>
                                        <option value="dermatology">Dermatology</option>
                                        <option value="psychiatry">Psychiatry</option>
                                        <option value="gastroenterology">Gastroenterology</option>
                                        <option value="urology">Urology</option>
                                        <option value="ent">ENT</option>
                                    </select>
                                    {errors.departmentname && <p className="text-red-500 text-sm mt-1">Department is required</p>}
                                </div>
                            )}
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="mobile">Mobile</label>
                                <PhoneInput
                                    id="mobile"
                                    country={'in'}
                                    value={phone}
                                    onChange={setPhone}
                                    inputStyle={{
                                        width: '100%',
                                        height: '44px',
                                        borderRadius: '8px',
                                        color: '#686677',
                                        fontFamily: 'Inter',
                                        fontSize: '15px',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: '25px',
                                    }}
                                    buttonStyle={{
                                        borderRadius: '8px 0 0 8px',
                                        backgroundColor: 'white',
                                    }}
                                    containerStyle={{
                                        marginTop: '0',
                                    }}
                                />
                                {errors.mobile && <p className="text-red-500 text-sm mt-1">Mobile number is required</p>}
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" className="py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300" onClick={handleClose}>
                                    Cancel
                                </button>
                                <button onClick={handleSubmit} type="button" className="btn-primary py-2 px-6 rounded-md flex items-center">
                                    <i className="fas fa-save mr-2"></i> Save User
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </>
    );
}
