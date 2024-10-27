import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useState } from "react";
import validator from "email-validator";
import Button from "./Button";
import { useTranslation } from "react-i18next";

const Form = () => {
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "", // Removed subject
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputFocus = (errorStateSetter) => {
    errorStateSetter(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    setNameError(formData.name === "");
    setEmailError(formData.email === "" || !validator.validate(formData.email));
    setMessageError(formData.message === "");

    if (nameError || emailError || messageError) { // Removed subjectError
      setFailed(true);
      return;
    }

    setSending(true);
    setFailed(false); // Reset failed state before attempting to send

    try {
      const response = await fetch('http://localhost:5000/api/contact', { // Changed port to 5000
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json(); // Optional, if you expect a response
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" }); // Clear form on success
    } catch (error) {
      console.error('Error:', error);
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  const handleButtonText = () => {
    if (sending) {
      return t("contact.form.loading");
    } else if (success) {
      return t("contact.form.success");
    } else if (failed || nameError || messageError || emailError) { // Removed subjectError
      return t("contact.form.failed");
    } else {
      return t("contact.form.send");
    }
  };

  return (
    <motion.form
      ref={ref}
      className="contactForm bg-transparent"
      initial={{ y: "10vw", opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: "10vw", opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      onSubmit={handleSubmit}
    >
      <h4 className="contentTitle">{t("contact.description")}</h4>

      {/* Name Input */}
      <motion.div className="col-12 col-md-6 formGroup">
        <input
          type="text"
          className={`formControl bg-transparent ${nameError ? "formError" : ""}`}
          onFocus={() => handleInputFocus(setNameError)}
          onChange={handleChange}
          value={formData.name}
          name="name"
          placeholder={nameError ? t("contact.form.nameError") : t("contact.form.name")}
          autoComplete="name"
        />
      </motion.div>

      {/* Email Input */}
      <motion.div className="col-12 col-md-6 formGroup">
        <input
          type="email"
          className={`formControl bg-transparent ${emailError ? "formError" : ""}`}
          onFocus={() => handleInputFocus(setEmailError)}
          onChange={handleChange}
          value={formData.email}
          name="email"
          placeholder={emailError ? t("contact.form.emailError") : t("contact.form.email")}
          autoComplete="email"
        />
      </motion.div>

      {/* Message Textarea */}
      <motion.div className="col-12 formGroup">
        <textarea
          className={`formControl bg-transparent ${messageError ? "formError" : ""}`}
          onFocus={() => handleInputFocus(setMessageError)}
          onChange={handleChange}
          value={formData.message}
          name="message"
          placeholder={messageError ? t("contact.form.messageError") : t("contact.form.message")}
          rows="4"
        />
      </motion.div>

      {/* Submit Button */}
      <motion.div className="col-12 formGroup formSubmit">
        <Button
          name={handleButtonText()}
          disabled={nameError || messageError || emailError || sending || success}
        />
      </motion.div>
    </motion.form>
  );
};

export default Form;
