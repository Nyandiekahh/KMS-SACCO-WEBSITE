import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const LoanApplicationPage = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    phoneNumber: '',
    email: '',
    address: '',
    occupation: '',
    isMember: 'no',
    membershipNumber: '',
    membershipDate: '',
    currentInvestment: '',
    loanAmount: '',
    loanPurpose: '',
    repaymentPeriod: '',
    guarantor1Name: '',
    guarantor1MembershipNumber: '',
    guarantor1Phone: '',
    guarantor1Email: '',
    guarantor1Investment: '',
    guarantor1Percentage: '',
    guarantor2Name: '',
    guarantor2MembershipNumber: '',
    guarantor2Phone: '',
    guarantor2Email: '',
    guarantor2Investment: '',
    guarantor2Percentage: '',
    totalPercentage: '',
    interestRateConfirmation: 'no',
    repaymentObligationConfirmation: 'no',
    declaration: 'no'
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: type === 'checkbox' ? (checked ? 'yes' : 'no') : value
    };

    // Clear error for this field when user changes it
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }

    // If guarantor percentages change, update total
    if (name === 'guarantor1Percentage' || name === 'guarantor2Percentage') {
      const g1 = parseInt(name === 'guarantor1Percentage' ? value : formData.guarantor1Percentage) || 0;
      const g2 = parseInt(name === 'guarantor2Percentage' ? value : formData.guarantor2Percentage) || 0;
      updatedFormData.totalPercentage = g1 + g2;
    }
    
    setFormData(updatedFormData);
  };

  const validateForm = () => {
    const errors = {};
    
    // Required fields
    if (!formData.fullName) errors.fullName = 'Full name is required';
    if (!formData.idNumber) errors.idNumber = 'ID number is required';
    if (!formData.phoneNumber) errors.phoneNumber = 'Phone number is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.address) errors.address = 'Address is required';
    if (!formData.occupation) errors.occupation = 'Occupation is required';
    if (!formData.loanAmount) errors.loanAmount = 'Loan amount is required';
    if (!formData.loanPurpose) errors.loanPurpose = 'Loan purpose is required';
    if (!formData.repaymentPeriod) errors.repaymentPeriod = 'Repayment period is required';
    
    // Membership validation
    if (formData.isMember === 'yes') {
      if (!formData.membershipNumber) errors.membershipNumber = 'Membership number is required';
      if (!formData.membershipDate) errors.membershipDate = 'Membership date is required';
      if (!formData.currentInvestment) errors.currentInvestment = 'Current investment is required';
      
      // Check if loan amount is less than or equal to 3x investment
      if (parseFloat(formData.loanAmount) > parseFloat(formData.currentInvestment) * 3) {
        errors.loanAmount = 'Loan amount cannot exceed 3x your investment';
      }
    }
    
    // Guarantor validation
    if (!formData.guarantor1Name) errors.guarantor1Name = 'Guarantor name is required';
    if (!formData.guarantor1MembershipNumber) errors.guarantor1MembershipNumber = 'Guarantor membership number is required';
    if (!formData.guarantor1Phone) errors.guarantor1Phone = 'Guarantor phone is required';
    if (!formData.guarantor1Email) errors.guarantor1Email = 'Guarantor email is required';
    if (!formData.guarantor1Investment) errors.guarantor1Investment = 'Guarantor investment is required';
    if (!formData.guarantor1Percentage) errors.guarantor1Percentage = 'Guarantor percentage is required';
    
    // If guarantor 2 has any data, validate all required fields
    if (formData.guarantor2Name || formData.guarantor2MembershipNumber || formData.guarantor2Phone || 
        formData.guarantor2Email || formData.guarantor2Investment || formData.guarantor2Percentage) {
      
      if (!formData.guarantor2Name) errors.guarantor2Name = 'Guarantor name is required';
      if (!formData.guarantor2MembershipNumber) errors.guarantor2MembershipNumber = 'Guarantor membership number is required';
      if (!formData.guarantor2Phone) errors.guarantor2Phone = 'Guarantor phone is required';
      if (!formData.guarantor2Email) errors.guarantor2Email = 'Guarantor email is required';
      if (!formData.guarantor2Investment) errors.guarantor2Investment = 'Guarantor investment is required';
      if (!formData.guarantor2Percentage) errors.guarantor2Percentage = 'Guarantor percentage is required';
    }
    
    // Total percentage must be 100%
    if (parseInt(formData.totalPercentage) !== 100) {
      errors.totalPercentage = 'Total guarantor percentage must equal 100%';
    }
    
    // Confirmations
    if (formData.interestRateConfirmation !== 'yes') {
      errors.interestRateConfirmation = 'You must confirm understanding the interest rate';
    }
    
    if (formData.repaymentObligationConfirmation !== 'yes') {
      errors.repaymentObligationConfirmation = 'You must confirm understanding the repayment obligations';
    }
    
    if (formData.declaration !== 'yes') {
      errors.declaration = 'You must agree to the declaration';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Scroll to first error
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // EmailJS configuration 
      // Replace these with your actual values
      const serviceId = 'service_6x9yn2l'; // The EmailJS service ID you created
      const adminTemplateId = 'template_loan_applicatio'; // Your admin template
      const notificationTemplateId = 'template_guarantor_conf'; // Your multipurpose template
      const publicKey = 'rtFCa3kC8EclhYnoh'; // Your EmailJS public key
      
      // Initialize EmailJS with your public key
      emailjs.init(publicKey);
      
      // 1. Main application notification to KMS admin
      await emailjs.sendForm(
        serviceId, 
        adminTemplateId, 
        formRef.current, 
        publicKey
      );
      
      // 2. Confirmation to the applicant using the multipurpose template
      await emailjs.send(
        serviceId, 
        notificationTemplateId, 
        {
          recipientName: formData.fullName,
          emailTitle: 'LOAN APPLICATION CONFIRMATION',
          status: 'Application Received',
          messageBody: 'Thank you for submitting your loan application to KMS SACCO Limited. We have received your application and it is now being processed.',
          cardTitle: 'Application Summary',
          loanAmount: formData.loanAmount,
          repaymentPeriod: formData.repaymentPeriod,
          loanPurpose: formData.loanPurpose,
          applicationDate: new Date().toLocaleDateString(),
          stepsHeading: 'Next Steps',
          isApplicant: true,
          isGuarantor: false,
          to_email: formData.email
        }, 
        publicKey
      );
      
      // 3. Notification to guarantor 1 using the same multipurpose template
      await emailjs.send(
        serviceId, 
        notificationTemplateId,
        {
          recipientName: formData.guarantor1Name,
          emailTitle: 'LOAN GUARANTEE REQUEST',
          status: 'Action Required',
          messageBody: `You have been selected as a guarantor for a loan application submitted by ${formData.fullName} to KMS SACCO Limited.`,
          cardTitle: 'Guarantee Details',
          loanAmount: formData.loanAmount,
          applicantName: formData.fullName,
          guaranteePercentage: formData.guarantor1Percentage,
          stepsHeading: 'What to do next',
          isApplicant: false,
          isGuarantor: true,
          to_email: formData.guarantor1Email
        }, 
        publicKey
      );
      
      // 4. Notification to guarantor 2 (if present) using the same multipurpose template
      if (formData.guarantor2Email) {
        await emailjs.send(
          serviceId, 
          notificationTemplateId, 
          {
            recipientName: formData.guarantor2Name,
            emailTitle: 'LOAN GUARANTEE REQUEST',
            status: 'Action Required',
            messageBody: `You have been selected as a guarantor for a loan application submitted by ${formData.fullName} to KMS SACCO Limited.`,
            cardTitle: 'Guarantee Details',
            loanAmount: formData.loanAmount,
            applicantName: formData.fullName,
            guaranteePercentage: formData.guarantor2Percentage,
            stepsHeading: 'What to do next',
            isApplicant: false,
            isGuarantor: true,
            to_email: formData.guarantor2Email
          }, 
          publicKey
        );
      }
      
      setFormSubmitted(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Failed to submit form:', error);
      setSubmitError('Failed to submit application. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form submission success message
  if (formSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md"
          >
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Application Submitted Successfully!</h2>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for applying for a loan with KMS SACCO Limited. We have received your application and will review it within 14 business days. Your guarantors will be contacted to confirm their commitment.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                If you have any questions, please contact us at kufanyanambayasacco@gmail.com or +254796611599.
              </p>
              <button
                onClick={() => window.location.href = '/'}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-base font-medium shadow-md transition duration-200"
              >
                Return to Home
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800">KMS Limited Loan Application</h1>
            <p className="mt-3 text-gray-600">
              Complete the form below to apply for a loan. All fields marked with * are required.
            </p>
          </div>
          
          {submitError && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {submitError}
            </div>
          )}
          
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
            {/* Applicant Information Section */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-blue-600 mb-6">Applicant Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border ${formErrors.fullName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {formErrors.fullName && <p className="mt-1 text-sm text-red-600 error-message">{formErrors.fullName}</p>}
                </div>
                
                <div>
                  <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700">
                    National ID Number *
                  </label>
                  <input
                    type="text"
                    id="idNumber"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border ${formErrors.idNumber ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {formErrors.idNumber && <p className="mt-1 text-sm text-red-600 error-message">{formErrors.idNumber}</p>}
                </div>
                
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border ${formErrors.phoneNumber ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {formErrors.phoneNumber && <p className="mt-1 text-sm text-red-600 error-message">{formErrors.phoneNumber}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border ${formErrors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {formErrors.email && <p className="mt-1 text-sm text-red-600 error-message">{formErrors.email}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Physical Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border ${formErrors.address ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {formErrors.address && <p className="mt-1 text-sm text-red-600 error-message">{formErrors.address}</p>}
                </div>
                
                <div>
                  <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
                    Occupation *
                  </label>
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border ${formErrors.occupation ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {formErrors.occupation && <p className="mt-1 text-sm text-red-600 error-message">{formErrors.occupation}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Are you a member of KMS Limited? *
                  </label>
                  <div className="mt-2 space-x-6 flex items-center">
                    <div className="flex items-center">
                      <input
                        id="isMemberYes"
                        name="isMember"
                        type="radio"
                        value="yes"
                        checked={formData.isMember === 'yes'}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="isMemberYes" className="ml-2 block text-sm text-gray-700">
                        Yes
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="isMemberNo"
                        name="isMember"
                        type="radio"
                        value="no"
                        checked={formData.isMember === 'no'}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="isMemberNo" className="ml-2 block text-sm text-gray-700">
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Membership Information Section (only for members) */}
            {formData.isMember === 'yes' && (
              <div className="border-b border-gray-200 pb-8">
                <h2 className="text-xl font-semibold text-blue-600 mb-6">Membership Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="membershipNumber" className="block text-sm font-medium text-gray-700">
                      Membership Number *
                    </label>
                    <input
                      type="text"
                      id="membershipNumber"
                      name="membershipNumber"
                      value={formData.membershipNumber}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border ${formErrors.membershipNumber ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {formErrors.membershipNumber && <p className="mt-1 text-sm text-red-600 error-message">{formErrors.membershipNumber}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="membershipDate" className="block text-sm font-medium text-gray-700">
                      Date of Membership * (Must be at least 6 months ago)
                    </label>
                    <input
                      type="date"
                      id="membershipDate"
                      name="membershipDate"
                      value={formData.membershipDate}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border ${formErrors.membershipDate ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {formErrors.membershipDate && <p className="mt-1 text-sm text-red-600 error-message">{formErrors.membershipDate}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="currentInvestment" className="block text-sm font-medium text-gray-700">
                      Current Investment Amount in the Sacco (KSh) *
                    </label>
                    <input
                      type="number"
                      id="currentInvestment"
                      name="currentInvestment"
                      value={formData.currentInvestment}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border ${formErrors.currentInvestment ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {formErrors.currentInvestment && <p className="mt-1 text-sm text-red-600 error-message">{formErrors.currentInvestment}</p>}
                    <p className="mt-1 text-xs text-gray-500">Your investment must be greater than the loan amount you wish to borrow.</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Loan Details Section */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-blue-600 mb-6">Loan Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">
                    Loan Amount (KSh) *
                  </label>
                  <input
                    type="number"
                    id="loanAmount"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border ${formErrors.loanAmount ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {formErrors.loanAmount && <p className="mt-1 text-sm text-red-600 error-message">{formErrors.loanAmount}</p>}
                  {formData.isMember === 'yes' && (
                    <p className="mt-1 text-xs text-gray-500">
                      Maximum loan amount is three times (3x) your investment in the Sacco.
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="repaymentPeriod" className="block text-sm font-medium text-gray-700">
                    Loan Repayment Period (Months) *
                  </label>
                  <input
                    type="number"
                    id="repaymentPeriod"
                    name="repaymentPeriod"
                    min="1"
                    max="36"
                    value={formData.repaymentPeriod}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border ${formErrors.repaymentPeriod ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {formErrors.repaymentPeriod && <p className="mt-1 text-sm text-red-600 error-message">{formErrors.repaymentPeriod}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="loanPurpose" className="block text-sm font-medium text-gray-700">
                    Purpose of the Loan *
                  </label>
                  <textarea
                    id="loanPurpose"
                    name="loanPurpose"
                    rows="3"
                    value={formData.loanPurpose}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border ${formErrors.loanPurpose ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="e.g., Education, Medical bills, Home improvement, Business"
                  />
                  {formErrors.loanPurpose && <p className="mt-1 text-sm text-red-600 error-message">{formErrors.loanPurpose}</p>}
                </div>
              </div>
            </div>
            
            {/* Guarantor Information Section */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-blue-600 mb-6">Guarantor Information</h2>
              <p className="mb-4 text-sm text-gray-600">
                Loans must be guaranteed by KMS Limited members whose investments are greater than the loan amount being borrowed.
                The total guarantee percentage must sum to exactly 100%.
              </p>
              
              {/* Guarantor 1 */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Guarantor 1</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="guarantor1Name" className="block text-sm font-medium text-gray-700">
                      Guarantor Full Name *
                    </label>
                    <input
                      type="text"
                      id="guarantor1Name"
                      name="guarantor1Name"
                      value={formData.guarantor1Name}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border ${formErrors.guarantor1Name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {formErrors.guarantor1Name && <p className="mt-1 text-sm text-red-600 error-message">{formErrors.guarantor1Name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="guarantor1MembershipNumber" className="block text-sm font-medium text-gray-700">
                      Guarantor Membership Number *
                    </label>
                    <input
                      type="text"
                      id="guarantor1MembershipNumber"
                      name="guarantor1MembershipNumber"
                      value={formData.guarantor1MembershipNumber}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border ${formErrors.guarantor1MembershipNumber ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {formErrors.guarantor1MembershipNumber && <p className="mt-1 text-sm text-red-600 error-message">{formErrors.guarantor1MembershipNumber}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="guarantor1Phone" className="block text-sm font-medium text-gray-700">
                      Guarantor Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="guarantor1Phone"
                      name="guarantor1Phone"
                      value={formData.guarantor1Phone}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border ${formErrors.guarantor1Phone ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {formErrors.guarantor1Phone && <p className="mt-1 text-sm text-red-600 error-message">{formErrors.guarantor1Phone}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="guarantor1Email" className="block text-sm font-medium text-gray-700">
                      Guarantor Email Address *
                    </label>
                    <input
                      type="email"
                      id="guarantor1Email"
                      name="guarantor1Email"
                      value={formData.guarantor1Email}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border ${formErrors.guarantor1Email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {formErrors.guarantor1Email && <p className="mt-1 text-sm text-red-600 error-message">{formErrors.guarantor1Email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="guarantor1Investment" className="block text-sm font-medium text-gray-700">
                      Guarantor's Investment Amount (KSh) *
                    </label>
                    <input
                      type="number"
                      id="guarantor1Investment"
                      name="guarantor1Investment"
                      value={formData.guarantor1Investment}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border ${formErrors.guarantor1Investment ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {formErrors.guarantor1Investment && <p className="mt-1 text-sm text-red-600 error-message">{formErrors.guarantor1Investment}</p>}
                    <p className="mt-1 text-xs text-gray-500">Must be greater than the loan amount.</p>
                  </div>
                  
                  <div>
                    <label htmlFor="guarantor1Percentage" className="block text-sm font-medium text-gray-700">
                      Guarantee Percentage (%) *
                    </label>
                    <input
                      type="number"
                      id="guarantor1Percentage"
                      name="guarantor1Percentage"
                      min="1"
                      max="100"
                      value={formData.guarantor1Percentage}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border ${formErrors.guarantor1Percentage ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {formErrors.guarantor1Percentage && <p className="mt-1 text-sm text-red-600 error-message">{formErrors.guarantor1Percentage}</p>}
                  </div>
                </div>
              </div>
              
              {/* Guarantor 2 */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Guarantor 2</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="guarantor2Name" className="block text-sm font-medium text-gray-700">
                      Guarantor Full Name
                    </label>
                    <input
                      type="text"
                      id="guarantor2Name"
                      name="guarantor2Name"
                      value={formData.guarantor2Name}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border ${formErrors.guarantor2Name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {formErrors.guarantor2Name && <p className="mt-1 text-sm text-red-600 error-message">{formErrors.guarantor2Name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="guarantor2MembershipNumber" className="block text-sm font-medium text-gray-700">
                      Guarantor Membership Number
                    </label>
                    <input
                      type="text"
                      id="guarantor2MembershipNumber"
                      name="guarantor2MembershipNumber"
                      value={formData.guarantor2MembershipNumber}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border ${formErrors.guarantor2MembershipNumber ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {formErrors.guarantor2MembershipNumber && <p className="mt-1 text-sm text-red-600 error-message">{formErrors.guarantor2MembershipNumber}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="guarantor2Phone" className="block text-sm font-medium text-gray-700">
                      Guarantor Phone Number
                    </label>
                    <input
                      type="tel"
                      id="guarantor2Phone"
                      name="guarantor2Phone"
                      value={formData.guarantor2Phone}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border ${formErrors.guarantor2Phone ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {formErrors.guarantor2Phone && <p className="mt-1 text-sm text-red-600 error-message">{formErrors.guarantor2Phone}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="guarantor2Email" className="block text-sm font-medium text-gray-700">
                      Guarantor Email Address
                    </label>
                    <input
                      type="email"
                      id="guarantor2Email"
                      name="guarantor2Email"
                      value={formData.guarantor2Email}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border ${formErrors.guarantor2Email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {formErrors.guarantor2Email && <p className="mt-1 text-sm text-red-600 error-message">{formErrors.guarantor2Email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="guarantor2Investment" className="block text-sm font-medium text-gray-700">
                      Guarantor's Investment Amount (KSh)
                    </label>
                    <input
                      type="number"
                      id="guarantor2Investment"
                      name="guarantor2Investment"
                      value={formData.guarantor2Investment}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border ${formErrors.guarantor2Investment ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {formErrors.guarantor2Investment && <p className="mt-1 text-sm text-red-600 error-message">{formErrors.guarantor2Investment}</p>}
                    <p className="mt-1 text-xs text-gray-500">Must be greater than the loan amount.</p>
                  </div>
                  
                  <div>
                    <label htmlFor="guarantor2Percentage" className="block text-sm font-medium text-gray-700">
                      Guarantee Percentage (%)
                    </label>
                    <input
                      type="number"
                      id="guarantor2Percentage"
                      name="guarantor2Percentage"
                      min="1"
                      max="100"
                      value={formData.guarantor2Percentage}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border ${formErrors.guarantor2Percentage ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {formErrors.guarantor2Percentage && <p className="mt-1 text-sm text-red-600 error-message">{formErrors.guarantor2Percentage}</p>}
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <label htmlFor="totalPercentage" className="block text-sm font-medium text-gray-700">
                    Total Guarantor Percentage
                  </label>
                  <input
                    type="number"
                    id="totalPercentage"
                    name="totalPercentage"
                    value={formData.totalPercentage}
                    readOnly
                    className={`w-24 px-3 py-2 border ${formErrors.totalPercentage ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none`}
                  />
                </div>
                <div className={`mt-2 text-sm ${parseInt(formData.totalPercentage) === 100 ? 'text-green-600' : 'text-red-600'}`}>
                  {parseInt(formData.totalPercentage) === 100 ? 
                    'Total percentage is 100%. Valid.' : 
                    'Total percentage must equal exactly 100%.'}
                </div>
                {formErrors.totalPercentage && <p className="mt-1 text-sm text-red-600 error-message">{formErrors.totalPercentage}</p>}
              </div>
            </div>
            
            {/* Additional Required Information Section */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-blue-600 mb-6">Terms and Conditions</h2>
              
              <div className="mb-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="interestRateConfirmation"
                      name="interestRateConfirmation"
                      type="checkbox"
                      checked={formData.interestRateConfirmation === 'yes'}
                      onChange={(e) => handleChange({
                        target: {
                          name: 'interestRateConfirmation',
                          type: 'checkbox',
                          checked: e.target.checked
                        }
                      })}
                      className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${formErrors.interestRateConfirmation ? 'border-red-300' : ''}`}
                    />
                  </div>
                  <label htmlFor="interestRateConfirmation" className="ml-3 block text-sm text-gray-700">
                    I understand that as per KMS Limited Terms and Conditions: "Interest Rate: Loans will be provided at an interest rate of 20% per month."
                  </label>
                </div>
                {formErrors.interestRateConfirmation && (
                  <p className="mt-1 text-sm text-red-600 error-message">{formErrors.interestRateConfirmation}</p>
                )}
              </div>
              
              <div className="mb-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="repaymentObligationConfirmation"
                      name="repaymentObligationConfirmation"
                      type="checkbox"
                      checked={formData.repaymentObligationConfirmation === 'yes'}
                      onChange={(e) => handleChange({
                        target: {
                          name: 'repaymentObligationConfirmation',
                          type: 'checkbox',
                          checked: e.target.checked
                        }
                      })}
                      className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${formErrors.repaymentObligationConfirmation ? 'border-red-300' : ''}`}
                    />
                  </div>
                  <label htmlFor="repaymentObligationConfirmation" className="ml-3 block text-sm text-gray-700">
                    I understand that I am obligated to repay my loan according to the agreed-upon terms and repayment schedule and that late loan payments will accrue late fees as determined by the Board of Directors.
                  </label>
                </div>
                {formErrors.repaymentObligationConfirmation && (
                  <p className="mt-1 text-sm text-red-600 error-message">{formErrors.repaymentObligationConfirmation}</p>
                )}
              </div>
            </div>
            
            {/* Declaration Section */}
            <div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="declaration"
                    name="declaration"
                    type="checkbox"
                    checked={formData.declaration === 'yes'}
                    onChange={(e) => handleChange({
                      target: {
                        name: 'declaration',
                        type: 'checkbox',
                        checked: e.target.checked
                      }
                    })}
                    className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${formErrors.declaration ? 'border-red-300' : ''}`}
                  />
                </div>
                <label htmlFor="declaration" className="ml-3 block text-sm text-gray-700">
                  I hereby declare that the information provided is true and correct. I understand that providing false information may result in rejection of my loan application and possible disciplinary action. I also agree to abide by the Sacco's terms and conditions regarding loans.
                </label>
              </div>
              {formErrors.declaration && (
                <p className="mt-1 text-sm text-red-600 error-message">{formErrors.declaration}</p>
              )}
            </div>
            
            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Submit Loan Application'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LoanApplicationPage;