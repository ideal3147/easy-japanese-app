import SettingsButton from './SettingsButton';

const Header = () => {
  return (
    <header className="w-full max-w-2xl flex justify-between items-center">
      <h1 className="text-2xl font-bold text-indigo-600">✏️かんたんにほんご</h1>
      <SettingsButton />
    </header>
  );
};

export default Header;
  