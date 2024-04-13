import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from '../user/UserNavbar';
import DoctorSidebar from './doctorsidebar';

const BloodTestForm = () => {
    const [donorStockList, setDonorStockList] = useState([]);
    const [selectedDonorIndex, setSelectedDonorIndex] = useState(null);
    const [formValues, setFormValues] = useState({
        generalHealth: 'good',
        disqualifyingMedications: '',
        recentTravel: '',
        recentTattoos: '',
        recentSexualActivity: '',
        drugUse: ''
    });
    const [bloodTestResult, setBloodTestResult] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/login/stf/ds');
                setDonorStockList(response.data);
            } catch (error) {
                console.error('Error fetching donor stock:', error.message);
            }
        };

        fetchData();
    }, []);

    const handleCheckBlood = async (donorId, formValues) => {
        try {
            const response = await axios.post(`http://localhost:5000/login/stf/ds/test-blood/${donorId}`, formValues);

            // Update UI based on blood test result
            if (response.data.result === 'safe' || response.data.result === 'unsafe') {
                console.log(`Blood is ${response.data.result}:`, response.data.donor);
            } else {
                console.log('Unknown blood test result received');
            }

            const updatedDonorStockList = donorStockList.map((donorStock, index) => {
                if (donorStock.id === donorId) {
                    setSelectedDonorIndex(index);
                    return { ...donorStock, blood_test_result: response.data.result };
                }
                return donorStock;
            });

            setDonorStockList(updatedDonorStockList);
            setBloodTestResult(response.data.result);
        } catch (error) {
            console.error('Error testing blood:', error.message);
        }
    };

    const handleFormSubmit = async () => {
        try {
            if (selectedDonorIndex !== null) {
                const selectedDonor = donorStockList[selectedDonorIndex];
                await handleCheckBlood(selectedDonor.id, formValues);
                setFormValues({
                    generalHealth: 'good',
                    disqualifyingMedications: '',
                    recentTravel: '',
                    recentTattoos: '',
                    recentSexualActivity: '',
                    drugUse: ''
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };

    return (
        <>
            <UserNavbar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <DoctorSidebar />
                    </div>
                    <div className="col-9">
                        <div className="container my-5">
                            <h1 className="text-center mb-2">Donor Details</h1>
                            <div className="table-responsive ">
                                <table className="table table-bordered table-hover my-2">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>Donor Name</th>
                                            <th>Blood Group</th>
                                            <th>Unit</th>
                                            <th>Blood Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {donorStockList && donorStockList.length > 0 ? (
                                            donorStockList.map((donorStock, index) => (
                                                <tr key={donorStock.id || index}>
                                                    <td>{donorStock.donor_name}</td>
                                                    <td>{donorStock.blood_group}</td>
                                                    <td>{donorStock.unit}</td>
                                                    <td>
                                                        {donorStock.blood_test_result !== null && donorStock.blood_test_result !== undefined ? (
                                                            donorStock.blood_test_result === 'safe' ? (
                                                                <span className="text-success">Safe</span>
                                                            ) : (
                                                                <span className="text-danger">Unsafe</span>
                                                            )
                                                        ) : (
                                                            'N/A'
                                                        )}
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-primary" onClick={() => setSelectedDonorIndex(index)}>
                                                            Check Blood
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">No donor stock available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {selectedDonorIndex !== null && (
                            <div className="card mt-5">
                                <div className="card-header">
                                    <h2>Check Blood Conditions for {donorStockList[selectedDonorIndex].donor_name}</h2>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label>General Health:</label>
                                            <select
                                                className="form-control"
                                                value={formValues.generalHealth}
                                                onChange={(e) => setFormValues({ ...formValues, generalHealth: e.target.value })}
                                            >
                                                <option value="good">Good</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Disqualifying Medications:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formValues.disqualifyingMedications}
                                                onChange={(e) => setFormValues({ ...formValues, disqualifyingMedications: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Recent Travel:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formValues.recentTravel}
                                                onChange={(e) => setFormValues({ ...formValues, recentTravel: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Recent Tattoos:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formValues.recentTattoos}
                                                onChange={(e) => setFormValues({ ...formValues, recentTattoos: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Recent Sexual Activity:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formValues.recentSexualActivity}
                                                onChange={(e) => setFormValues({ ...formValues, recentSexualActivity: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Drug Use:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formValues.drugUse}
                                                onChange={(e) => setFormValues({ ...formValues, drugUse: e.target.value })}
                                            />
                                        </div>
                                        <button type="button" className="btn btn-primary" onClick={handleFormSubmit}>
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {bloodTestResult && (
                            <div className="mt-5">
                                <h2>Blood Test Result</h2>
                                {bloodTestResult === 'safe' ? (
                                    <p className="text-success">Blood is safe</p>
                                ) : (
                                    <p className="text-danger">Blood is unsafe</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BloodTestForm;