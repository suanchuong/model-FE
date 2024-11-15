import React from 'react';
import './Wallpaper.css';
import Pic_1 from '../../../../assets/img/wallpaper/1.jpg';
import Pic_2 from '../../../../assets/img/wallpaper/2.jpg';
import Pic_3 from '../../../../assets/img/wallpaper/3.jpg';
import Pic_4 from '../../../../assets/img/wallpaper/4.jpg';
import Pic_5 from '../../../../assets/img/wallpaper/5.jpg';
import Pic_6 from '../../../../assets/img/wallpaper/6.jpg';

const Wallpaper = () => {


    return (
        <div className='wallpaper'>
            <div className="wallpaper-item">
                <div className="pic">
                    <div className="pic-top">
                        <div className="thumb" data-src={Pic_1}>
                            <img src={Pic_1} alt="Wallpaper 1" />
                        </div>
                        <div className="thumb" data-src={Pic_3}>
                            <img src={Pic_3} alt="Wallpaper 3" />
                        </div>
                    </div>
                    <div className="pic-bot">
                        <div className="thumb" data-src={Pic_4}>
                            <img src={Pic_4} alt="Wallpaper 4" />
                        </div>
                    </div>
                </div>

                <div className="pic">
                    <div className="pic-bot">
                        <div className="thumb" data-src={Pic_5}>
                            <img src={Pic_5} alt="Wallpaper 5" />
                        </div>
                    </div>
                    <div className="pic-top">
                        <div className="thumb" data-src={Pic_2}>
                            <img src={Pic_2} alt="Wallpaper 2" />
                        </div>
                        <div className="thumb" data-src={Pic_6}>
                            <img src={Pic_6} alt="Wallpaper 6" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallpaper;
