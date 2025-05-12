import ProfileIcon from '@/components/icon/profile-icon';

function ProfilePage() {
  return (
    <div className='container mx-auto px-4 md:pt-[75px] pt-10'>
      <div className='flex items-center gap-4 pb-4 border-b md:pb-6'>
        <ProfileIcon />
        <h1 className='font-bold md:text-base text-sm'>Attah Inyang</h1>
      </div>
    </div>
  );
}

export default ProfilePage;
