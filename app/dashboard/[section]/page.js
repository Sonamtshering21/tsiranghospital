
// import other components as needed
import Annoucement from '../componenetsadminsec/Text'
import Picture from '../componenetsadminsec/adminannoucement'
import Pdf from '../componenetsadminsec/pdf'
import Mixed from '../componenetsadminsec/mixed'
import styles from '../componenetsadminsec/sidebar.module.css'
export default function SectionPage({ params }) {
    const { section } = params;

    const renderContent = () => {
        switch (section) {
            case 'text':
                return <Annoucement />;
            case 'adminannoucement':
              return <Picture/>;
            case 'pdf':
              return <Pdf/>
            case 'mixed':
              return <Mixed />
            default:
              console.log('not Rendering Annoucement component');
                return <p>Select a valid section.</p>;
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.contentContainer}>
                {renderContent()}
            </div>
        </div>
    );
}