import AuthNavbar from '@/components/auth/AuthNavbar';
import ProfessionalRegistrationForm from '@/components/auth/register/ProfessionalRegistrationForm';

export default function RegisterPage() {
  return (
    <div className='min-h-screen pt-26 bg-white flex flex-col'>
      <AuthNavbar />
      <ProfessionalRegistrationForm />
    </div>
  );
}
