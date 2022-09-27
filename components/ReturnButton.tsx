import Image from "next/image";
import styles from "../styles/ReturnButton.module.scss";
import { useRouter } from "next/router";

type ReturnButtonProps = {
  text: String;
}

const ReturnButton = ({ text }: ReturnButtonProps) => {
  const router = useRouter();
  
  return (
    <div 
      className={styles.returnButton}
      onClick={router.back}  
    >
      <Image
        src="/images/icons/return_arrow.svg"
        width={30}
        height={30}
      />
      <p>{text}</p>
    </div>
  );
}

export default ReturnButton;