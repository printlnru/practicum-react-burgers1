import ProfileMenu from '../../components/profile-menu/profile-menu';
import style from './orders-page.module.css';

export default function OrdersPage() {

    return (
        <div className={style.center}>
            <div className={style.app}>

                <div className={style.col1}>
                    <ProfileMenu />
                </div>
                <div className={style.col2}>
                    <div className={style.container}>
                        <form >
                            <div className='pb-6'>
                            Тут будет история заказов...
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div>
    );
}