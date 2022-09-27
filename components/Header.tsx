import ReturnButton from "./ReturnButton";
import styles from "../styles/Header.module.scss";
import Image from "next/image";

type HeaderProps = {
  returnButtonText: string;
}

const Header = ({ returnButtonText }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <div>
        <ReturnButton 
          text={returnButtonText} 
        />
      </div>
      <div className={styles.logoDiv}>
        <Image
          src="/images/wr_logo_v1_light.svg"
          width={100}
          height={100}
        />
      </div>
      <div></div>
    </div>    
  )
}

export default Header;