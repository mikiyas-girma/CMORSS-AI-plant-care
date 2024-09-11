import { LogOut } from '@/assets/Icons';

type ProfileProp = {
  username: string;
  profilePhoto?: string;
};

const ProfileShortcut: React.FC<ProfileProp> = ({ username, profilePhoto }) => {
  return (
    <section className="flex items-center justify-between rounded-lg bg-gray-neutral p-2 cursor-default">
      <div className="flex items-center gap-2">
        <img
          src={profilePhoto || '/image-04.jpg'}
          className="h-[50px] w-[50px] overflow-hidden rounded-full border-2 border-white"
        />
        <p className="text-xs font-bold text-gray-full">{username}</p>
      </div>

      <button
        className="cursor-pointer hover:opacity-65 transition-opacity duration-300 ease-in z-10"
        onClick={() => alert('Log out button clicked')}
      >
        <LogOut color="red" size={18} />
      </button>
    </section>
  );
};

export default ProfileShortcut;
