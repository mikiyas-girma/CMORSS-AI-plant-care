import { useContext } from 'react';
import { LogOut } from '@/assets/Icons';
import { AuthContext } from '@/contexts/AuthContext';

type ProfileProp = {
  username: string;
  profilePhoto?: string;
};

const ProfileShortcut: React.FC<ProfileProp> = ({ username, profilePhoto }) => {
  const authContext = useContext(AuthContext);
  const handleLogout = async () => {
    if (authContext) {
      try {
        await authContext.signOut();
      } catch (error) {
        console.error('Error while logging out:', error);
      }
    }
  };

  return (
    <section className="flex cursor-default items-center justify-between rounded-lg bg-gray-neutral p-2">
      <div className="flex items-center gap-2">
        <img
          src={profilePhoto || '/image-04.jpg'}
          className="h-[50px] w-[50px] overflow-hidden rounded-full border-2 border-white"
        />
        <p className="text-xs font-bold text-gray-full">{username}</p>
      </div>

      <button
        className="z-10 cursor-pointer transition-opacity duration-300 ease-in hover:opacity-65"
        onClick={handleLogout}
      >
        <LogOut color="red" size={18} />
      </button>
    </section>
  );
};

export default ProfileShortcut;
