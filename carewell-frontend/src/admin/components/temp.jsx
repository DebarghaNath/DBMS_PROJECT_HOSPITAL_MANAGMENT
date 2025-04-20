import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { BASE_URL } from "../../config"

export default function UserAddModal(props) {
    const [isADoctor, setIsADoctor] = useState(false);
    const [phone, setPhone] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null); // Track selected country
    const countryOptions = countryList().getData(); // Get country list options

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        role: '',
        departmentname: '',
    });

    const [errors, setErrors] = useState({
        name: false,
        email: false,
        mobile: false,
        role: false,
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

    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption); // Update selected country
    };

    const handleSubmit = async () => {
        const newErrors = {
            name: !formData.name,
            email: !formData.email,
            mobile: !phone.slice(2),
            role: !formData.role,
            departmentname: isADoctor && !formData.departmentname,
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
                    country: selectedCountry?.label, // Include selected country
                    countryCode: selectedCountry?.value, // Include selected country code
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add user');
            }

            const data = await response.json();
            console.log('User added successfully:', data);

            props.setOpenModal(false);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const isHidden = !props.openModal ? 'hidden' : '';

    return (
        <>
            <div id="addUserModal" className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${isHidden}`}>
                <div className="bg-white rounded-lg w-full max-w-md mx-4">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="text-lg font-semibold">Add New User</h3>
                        <button
                            className="text-gray-500 hover:text-gray-700"
                            id="closeModalBtn"
                            onClick={() => props.setOpenModal(false)}
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <form className="p-6">
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="name">
                                Full Name
                            </label>
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
                            <label className="block text-gray-700 mb-2" htmlFor="email">
                                Email
                            </label>
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
                            <label className="block text-gray-700 mb-2" htmlFor="role">
                                Role
                            </label>
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
                                <label className="block text-gray-700 mb-2" htmlFor="department">
                                    Department
                                </label>
                                <select
                                    id="department"
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
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="country">
                                Country
                            </label>
                            <Select
                                id="country"
                                options={countryOptions}
                                value={selectedCountry}
                                onChange={handleCountryChange}
                                placeholder="Select Country"
                                className="w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="mobile">
                                Mobile Number
                            </label>
                            <PhoneInput
                                id="mobile"
                                country={'in'}
                                value={phone}
                                onChange={(phone) => setPhone(phone)}
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
                            {errors.mobile && <p className="text-red-500 text-sm">Mobile number is required</p>}
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                className="py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300"
                                id="cancelAddUserBtn"
                                onClick={() => props.setOpenModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                type="button"
                                className="btn-primary py-2 px-6 rounded-md flex items-center"
                            >
                                <i className="fas fa-save mr-2"></i> Save User
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}