import SettingsButton from './SettingsButton';
import SignOutButton from './SignOutButton';

const Header = () => {
  return (
    <header className="w-full max-w-2xl flex justify-between items-center">
      <h1 className="text-2xl font-bold text-indigo-600">✏️かんたんにほんご</h1>
      <div className="flex flex-col items-start space-y-2">
        <SettingsButton />
        <SignOutButton />
      </div>
    </header>
  );
};

export default Header;
  