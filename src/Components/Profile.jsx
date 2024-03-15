import React, { useState } from 'react';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import "../Components/Details.css"

export const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: 'Aamer',
        lastName: 'Sohel',
        expertise: 'Software Engineering',
    });
    const salaryTypesDefaultRates = [
        {
            type: "hourly",
            fixedRate: 24,
            range: {
                min: 24,
                max: 32,
            },
        },
        {
            type: "monthly",
            fixedRate: 3600,
            range: {
                min: 2600,
                max: 3600,
            },
        },
        {
            type: "annual",
            fixedRate: 80000,
            range: {
                min: 70000,
                max: 90000,
            },
        },
    ];

    const [activeTab, setActiveTab] = useState('hourly'); // Default to hourly
    const [isFixedRate, setIsFixedRate] = useState(true);
    const [fixedRate, setFixedRate] = useState(salaryTypesDefaultRates[0].fixedRate);
    const [rangeMin, setRangeMin] = useState(salaryTypesDefaultRates[0].range.min);
    const [rangeMax, setRangeMax] = useState(salaryTypesDefaultRates[0].range.max);

    const handleTabChange = (type) => {
        setActiveTab(type);
        const defaultRate = salaryTypesDefaultRates.find(rate => rate.type === type);
        setFixedRate(defaultRate.fixedRate);
        setRangeMin(defaultRate.range.min);
        setRangeMax(defaultRate.range.max);
    };

    const handleFixedRateChange = (e) => {
        setFixedRate(e.target.value);
    };

    const handleRangeMinChange = (e) => {
        setRangeMin(e.target.value);
    };

    const handleRangeMaxChange = (e) => {
        setRangeMax(e.target.value);
    };

    const toggleSalaryType = () => {
        setIsFixedRate(!isFixedRate);
    };



    const handleEditClick = () => {
        setIsEditing(true);
        setIsEditing(!isEditing);
    };
    const handleCancelClick = () => {
        setProfile(profile); // Revert to the stored profile
        setIsEditing(false);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // Perform API call to save updated profile
        console.log('Profile saved:', profile);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    return (
        <div className='container-fluid mt-2'>
            
            {isEditing ? (
                <>
                    <Row>
                        <Col md={10}><h1>Profile Setting</h1></Col>
                        <Col>
                            <Button variant="dark" onClick={handleSaveClick}>Save</Button>{' '}
                        </Col>
                        <Col>
                            {/* <Button variant="dark">Dark</Button> */}
                            <Button variant="light" onClick={handleCancelClick}>Cancel</Button>{' '}
                        </Col>
                    </Row>
                    {/* User Details */}
                    <Form>
                        <Row>
                            <Col><Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" name="name" value={profile.name} onChange={handleChange} />
                            </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name="lastName" value={profile.lastName} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Job title</Form.Label>
                                    <Form.Control type="text" name="expertise" value={profile.expertise} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>

                    {/* Salary Details  */}

                    <div className="profile-container">
                        <div className="salary-tabs">
                            {salaryTypesDefaultRates.map(rate => (
                                <Button variant='light'
                                    key={rate.type}
                                    className={`tab-button ${activeTab === rate.type ? 'active' : ''}`}
                                    onClick={() => handleTabChange(rate.type)}
                                    disabled={!isEditing}
                                >
                                    {rate.type}
                                </Button>
                            ))}
                        </div>
                        <div className="salary-picker">
                            <label>Salary Value:</label>
                            {activeTab !== 'hourly' && (
                                <div className="switch-toggle">
                                    <Form.Control
                                        type="checkbox"
                                        id="salary-toggle"
                                        checked={isFixedRate}
                                        onChange={toggleSalaryType}
                                        disabled={!isEditing}
                                    />
                                    <label htmlFor="salary-toggle" className="switch"></label>
                                    <span>{isFixedRate ? 'Fixed Rate' : 'Salary Range'}</span>
                                </div>
                            )}
                            {isFixedRate ? (
                                <>
                                    <Row>
                                        <Col md={3}>
                                            <Form.Control type="number" value={fixedRate} onChange={handleFixedRateChange} disabled={!isEditing} />
                                        </Col>
                                    </Row>
                                </>

                            ) : (
                                <>
                                    <Row>
                                        <Col>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Text>$</InputGroup.Text>
                                                <Form.Control type="number" value={rangeMin} onChange={handleRangeMinChange} disabled={!isEditing} />
                                                <InputGroup.Text>Min</InputGroup.Text>
                                            </InputGroup>

                                        </Col>
                                        <Col>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Text>$</InputGroup.Text>
                                                <Form.Control type="number" value={rangeMax} onChange={handleRangeMaxChange} disabled={!isEditing} />
                                                <InputGroup.Text>Max</InputGroup.Text>
                                            </InputGroup>

                                        </Col>
                                        <Col md={8}></Col>
                                    </Row>


                                </>
                            )}
                        </div>

                    </div>
                </>
            ) : (
                <>
                    <Row>
                        <Col><h1>Profile Setting</h1></Col>
                        <Col></Col>
                        <Col>
                            <Button variant="primary" onClick={handleEditClick}>Edit</Button>{' '}
                        </Col>
                    </Row>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" value={profile.name} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" value={profile.lastName} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label>Job title</Form.Label>
                                    <Form.Control type="text" value={profile.expertise} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                    <div className="profile-container">
                        <div className="salary-tabs">
                            {salaryTypesDefaultRates.map(rate => (
                                <Button variant='light'
                                    key={rate.type}
                                    className={activeTab === rate.type ? 'active' : ''}
                                    onClick={() => handleTabChange(rate.type)}
                                    disabled={!isEditing}
                                >
                                    {rate.type}
                                </Button>
                            ))}
                        </div>
                        <div className="salary-picker">
                            <label>Salary Value:</label>
                            {activeTab !== 'hourly' && (
                                <div className="switch-toggle">
                                    <Form.Control
                                        type="checkbox"
                                        id="salary-toggle"
                                        checked={isFixedRate}
                                        onChange={toggleSalaryType}
                                        disabled={!isEditing}
                                    />
                                    <label htmlFor="salary-toggle" className="switch"></label>
                                    <span>{isFixedRate ? 'Fixed Rate' : 'Salary Range'}</span>
                                </div>
                            )}
                            {isFixedRate ? (
                                <>
                                    <Row>
                                        <Col md={3}>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Text>$</InputGroup.Text>
                                                <Form.Control type="number" value={fixedRate} onChange={handleFixedRateChange} disabled={!isEditing} />
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                </>


                            ) : (
                                <>
                                    <Form.Control type="number" value={rangeMin} onChange={handleRangeMinChange} disabled={!isEditing} />
                                    <span>to</span>
                                    <Form.Control type="number" value={rangeMax} onChange={handleRangeMaxChange} disabled={!isEditing} />
                                </>
                            )}
                        </div>
                    </div>
                </>

            )}
        </div>
    );
};

