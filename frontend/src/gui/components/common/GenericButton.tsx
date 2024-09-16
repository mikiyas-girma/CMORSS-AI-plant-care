type GenericButtonType = React.ButtonHTMLAttributes<HTMLButtonElement>;

const GenericButton: React.FC<GenericButtonType> = (props) => {
  return (
    <button
      {...props}
      className={
        props.className +
        ' rounded-lg bg-gray-200 p-2 disabled:bg-slate-800 w-[100px] disabled:text-white hover:opacity-65 disabled:hover:opacity-100 transition-opacity duration-700 ease-out cursor-pointer disabled:cursor-not-allowed'
      }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default GenericButton;
