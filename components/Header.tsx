import styles from "../styles/Header.module.scss";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logoDiv}>
        <Link href="/">
          <Image
            src="/images/wr_logo_v1_light.svg"
            width={100}
            height={100}
          />
        </Link>
      </div>
    </div>    
  )
}

export default Header;