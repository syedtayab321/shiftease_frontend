import React from 'react';
import appstorepicture from './../../assets/images/app-store.png'
import playstorepicture from './../../assets/images/play-store.png'
import manphone from './../../assets/images/man-with-phone.png'
export default function AppSection() {
    return(
        <>
            <section className="app_section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="img-box">
                                <img src={manphone} alt=""/>
                            </div>
                        </div>
                        <div className="col-md-6 offset-md-2">
                            <div className="detail-box">
                                <h2>
                                    <span> 50% </span> off On every Order
                                    download now our app
                                </h2>
                                <p>
                                    There are many variations of passages of Lorem Ipsum available, but the majority
                                    have suffered alteration
                                    in
                                    some form, by
                                </p>
                                <div className="btn-box">
                                    <a href="#">
                                        <img src={appstorepicture} alt=""/>
                                    </a>
                                    <a href="#">
                                        <img src={playstorepicture} alt=""/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}