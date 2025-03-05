import { func, number, string } from 'prop-types';
import HamburgerIcon from './HamburgerIcon';
import LeftIcon from '../LeftIcon';

ChatHeader.propTypes = {
  title: string.isRequired,
  people: number.isRequired,
  onClick: func,
};

export default function ChatHeader({ title, people, onClick }) {
  return (
    <>
      <header className="flex flex-row justify-between px-3 py-2 bg-white h-[38px]">
        <LeftIcon />
        <div className="flex flex-row gap-1 items-center">
          <h2 className="text-base">{title}</h2>
          <span className="font-semibold">{people}</span>
        </div>
        <HamburgerIcon onClick={onClick} />
      </header>
    </>
  );
}
