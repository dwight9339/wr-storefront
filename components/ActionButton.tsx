import styles from "../styles/ActionButton.module.scss";

type ActionButtonProps = {
  text: string;
  action: Function;
  disabled: Boolean;
}

const ActionButton = ({
  text,
  action,
  disabled
}: ActionButtonProps) => {
  const doAction = () => !disabled && action();

  return (
    <div 
      className={`${styles.button} ${disabled && styles.disabled}`}
      onClick={doAction}  
    >
      {text}
    </div>
  )
}

export default ActionButton;