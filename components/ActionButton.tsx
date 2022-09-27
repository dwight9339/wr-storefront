import styles from "../styles/ActionButton.module.scss";

type ActionButtonProps = {
  text: string;
  action: Function;
}

const ActionButton = ({
  text,
  action
}: ActionButtonProps) => {
  const doAction = () => action();

  return (
    <div 
      className={styles.button}
      onClick={doAction}  
    >
      {text}
    </div>
  )
}

export default ActionButton;