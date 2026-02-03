import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container`}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <span className={styles.brandName}>SmartShift English</span>
                        <p className={styles.brandDesc}>
                            학원 원장님을 위한 AI 변형 문제 & 스마트 관리 솔루션.
                            업무 효율은 높이고, 학생들의 성적과 유지율은 극대화합니다.
                        </p>
                    </div>

                    <div className={styles.column}>
                        <span className={styles.columnHeader}>Product</span>
                        <Link href="#" className={styles.link}>Features</Link>
                        <Link href="#" className={styles.link}>Pricing</Link>
                        <Link href="#" className={styles.link}>For Academies</Link>
                    </div>

                    <div className={styles.column}>
                        <span className={styles.columnHeader}>Company</span>
                        <Link href="#" className={styles.link}>About Us</Link>
                        <Link href="#" className={styles.link}>Blog</Link>
                        <Link href="#" className={styles.link}>Contact</Link>
                    </div>

                    <div className={styles.column}>
                        <span className={styles.columnHeader}>Legal</span>
                        <Link href="#" className={styles.link}>Privacy Policy</Link>
                        <Link href="#" className={styles.link}>Terms of Service</Link>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <span>© 2025 SmartShift AI. All rights reserved.</span>
                    <div className={styles.legalLinks}>
                        {/* Additional legal links or social icons could go here */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
