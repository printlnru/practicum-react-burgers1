
import ProfileMenu from '../../components/profile-menu/profile-menu';
import style from './order-page.module.css';

export default function OrderPage() {

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
                            Тут будет информация по заказу
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div>
    );
}