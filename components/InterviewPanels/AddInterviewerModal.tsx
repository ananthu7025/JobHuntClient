/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import InputText from "@/components/InputComponents/InputText";
import InputDropDown from "@/components/InputComponents/InputDropDown";
import InputTextArea from "@/components/InputComponents/InputTextArea";
import { SelectItem } from "@/types";

interface InterviewerFormData {
  name: string;
  email: string;
  role: string;
  expertise: SelectItem[];
  bio?: string;
}

interface AddInterviewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AddInterviewerModal: React.FC<AddInterviewerModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const hookForm = useForm<InterviewerFormData>({
    defaultValues: {
      name: "",
      email: "",
      role: "",
      expertise: [],
      bio: ""
    }
  });

  const { handleSubmit, reset } = hookForm;


  const expertiseOptions: SelectItem[] = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "React", label: "React" },
    { value: "Python", label: "Python" },
    { value: "Java", label: "Java" },
    { value: "System Design", label: "System Design" },
    { value: "Product Strategy", label: "Product Strategy" },
    { value: "User Research", label: "User Research" },
    { value: "Node.js", label: "Node.js" },
    { value: "Angular", label: "Angular" },
    { value: "Vue.js", label: "Vue.js" },
    { value: "Machine Learning", label: "Machine Learning" },
    { value: "Data Science", label: "Data Science" },
    { value: "DevOps", label: "DevOps" },
    { value: "Mobile Development", label: "Mobile Development" },
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "Database Design", label: "Database Design" },
    { value: "Cloud Architecture", label: "Cloud Architecture" },
    { value: "Cybersecurity", label: "Cybersecurity" }
  ];

  // Generate random avatar color from predefined options
  const getRandomAvatarColor = () => {
    const colors = ["bg-blue-100", "bg-green-100", "bg-orange-100", "bg-purple-100", "bg-pink-100"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const onFormSubmit = (data: InterviewerFormData) => {
    const submissionData = {
      id: data.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase(),
      name: data.name,
      role: data.role,
      expertise: data.expertise.map(exp => exp.value),
      currentLoad: 0,
      availability: 'Available',
      availabilityStatus: 'available',
      nextAvailable: new Date().toISOString().split('T')[0] + ' 09:00',
      avatarColor: getRandomAvatarColor(),
      email: data.email,
      bio: data.bio
    };

    onSubmit(submissionData);
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '0',
      border: 'none',
      borderRadius: '12px',
      width: '700px',
      maxWidth: '95vw',
      maxHeight: '95vh',
      overflow: 'auto'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      zIndex: 1000
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={modalStyles}
      ariaHideApp={false}
    >
      <div className="create-email-template-modal">
        <div className="modal-header">
          <h2>Add New Interviewer</h2>
          <button className="close-btn" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="modal-body">

            {/* Basic Information */}
            <div className="form-section">
              <h3>Basic Information</h3>
              <div className="form-row">
                <div className="form-group half-width">
                  <InputText
                    hookForm={hookForm}
                    field="name"
                    label="Full Name"
                    labelMandatory
                    placeholder="Enter interviewer's full name"
                  />
                </div>
                <div className="form-group half-width">
                  <InputText
                    hookForm={hookForm}
                    field="email"
                    label="Email Address"
                    labelMandatory
                    placeholder="interviewer@company.com"
                    type="email"
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <InputText
                  hookForm={hookForm}
                  field="role"
                  label="Job Title/Role"
                  labelMandatory
                  placeholder="e.g., Senior Software Engineer, Product Manager"
                />
              </div>
            </div>

            {/* Expertise and Skills */}
            <div className="form-section">
              <h3>Expertise & Skills</h3>
              <div className="form-group full-width">
                <InputDropDown
                  hookForm={hookForm}
                  field="expertise"
                  label="Areas of Expertise"
                  labelMandatory
                  options={expertiseOptions}
                  placeholder="Select skills and expertise areas"
                  isMuliple
                />
              </div>

              <div className="form-group full-width">
                <InputTextArea
                  hookForm={hookForm}
                  field="bio"
                  label="Professional Bio (Optional)"
                  placeholder="Brief description of background and experience..."
                  rows={3}
                />
              </div>
            </div>



          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="create-btn">
              Add Interviewer
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddInterviewerModal;