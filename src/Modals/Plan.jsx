import {React, useEffect, useState} from 'react';
import '../App.css';
import {  Link, useNavigate  } from 'react-router-dom';


import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getLocalPaymentLink } from '../ApiService';

const Plan1 = ({isOpen,onClose,selectedItem, serviceItems }) => {

    const [productId, setProductId] = useState('your-product-id'); // Replace with actual product ID
    const [isMobile, setIsMobile] = useState(false);
    const accessToken = sessionStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
          const checkWidth = () => {
            setIsMobile(window.innerWidth < 992); // Adjust breakpoint as needed
          };
          checkWidth();
          window.addEventListener('resize', checkWidth);
        
          // Cleanup function
          return () => {
            window.removeEventListener('resize', checkWidth);
          };
        }, []);


    if (!selectedItem) return null;
    console.log(selectedItem.img);
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('overlay')) {
            onClose();
        }
    }; if (!isOpen) return null;



    const handleGetLocalPaymentLink = async (productID) => {
        try {
          const data = await getLocalPaymentLink(accessToken, productID);
          if (data && data.status !== 403) {
            window.open(data.data, "_blank")
            console.log('Local payment link retrieved successfully');
          } else {
            console.log('Failed to retrieve local payment link');
          }
        } catch (error) {
          console.error('Error retrieving local payment link:', error);
        }
      };

    const purchaseService = () => {
        console.log(selectedItem.package_id)
        handleGetLocalPaymentLink(selectedItem.package_id)
      }

      const purchaseServiceStripe = () => {
        sessionStorage.setItem("ckg", selectedItem.code);
        window.location.href =  selectedItem.link;
      }
      
    function getFirstWordInLowerCase(str) {
    // Split the string by whitespace and get the first word
    const firstWord = str.split(' ')[0];
    
    // Convert the first word to lowercase
    const lowerCaseFirstWord = firstWord.toLowerCase();
    
    return lowerCaseFirstWord;
    }

    return (
        <div onClick={handleOverlayClick} className="overlay ">

            <div onClick={(e)=>{e.stopPropagation()}} class="modalContainer fadeIn">
                    <button onClick={onClose} class="closeBtn"><i class="fa-solid fa-x"></i></button>
                {!isMobile ? (<>

                    <div class="row px-5 py-3 w-100">
                        <div className="col-12 col-lg-6 mt-5 ps-1">
                                <img className='modal-logo ' src={require(`../Assets/${getFirstWordInLowerCase(selectedItem.name)}.png`)} alt="" />
                                <h3 className='modal-info-1 mt-4'>{selectedItem.name}</h3>


                            
                            <div className="">
                               {/*  <div className='d-flex'>
                                    {selectedItem.firstPrice && (
                                        <h5 className='modal-info-2'>{selectedItem.firstPrice}₺</h5>
                                    )}
                                    <div className='discount'> 
                                        <h6 style={{fontSize:"0.7rem"}} className='m-0'>%20 İNDİRİM</h6>
                                    </div>
                                </div> */}
                                <h4 className='modal-info-4'>{selectedItem.price} {selectedItem.currency}{selectedItem.code && selectedItem.code.slice(-3).toUpperCase() === 'ABN' && (<span className='month'>/aylık</span>)}</h4>
                                <h6>Kredi kartına Ayda 12 Taksit!</h6>
                            </div>
                            <ul className='mt-4 ps-3'>
                                {/* {selectedItem.info1 && (
                                    <li>
                                        <h5 className='modal-info-3'>{selectedItem.info1}</h5>
                                    </li>
                                )}
                                {selectedItem.info2 && (
                                    <li>
                                        <h5 className='modal-info-3'>{selectedItem.info2}</h5>
                                    </li>
                                )}
                                {selectedItem.info3 && (
                                    <li>
                                        <h5 className='modal-info-3'>{selectedItem.info3}</h5>
                                    </li>
                                )}
                                {selectedItem.info4 && (
                                    <li>
                                        <h5 className='modal-info-3'>{selectedItem.info4}</h5>
                                    </li>
                                )} */}
                            </ul>

                            <button onClick={purchaseService} className='satin-al mt-4 d-flex' type="">Satın Al (Yurtiçi)</button>
                            <button onClick={purchaseServiceStripe} className='satin-al mt-2 d-flex' type="">Satın Al (Yurtdışı)</button>

                            
                            
                    </div>
                        <div className="col-12 col-lg-6 m-auto d-flex justify-content-center">
                                <img className='service-img fadeIn' src={require(`../Assets/services/${selectedItem.code}.png`)} alt="" />
                        </div>
                    </div>
                    
                </>):(<>
                    <div class="row w-100">
                    <Swiper
                    grabCursor={false}
                    loop={false}
                    speed={1000}
                    slidesPerView={1}
                    pagination={{
                    type: 'progressbar',
                    }}
                    
                    navigation={false}
                    modules={[Pagination, Navigation]}
                    style={{
                    }}
                    className="mySwiper"
                >

                    <SwiperSlide>
                        <div className="col-12 col-lg-6 mt-5 ps-1 text-center">
                            <div className='row '>
                                <div className='col-12 justify-content-center d-flex'>
                                    <img className='modal-logo ' src={require(`../Assets/${getFirstWordInLowerCase(selectedItem.name)}.png`)} alt="" />
                                </div>
                                <div className='col-12 justify-content-center d-flex'>
                                    <h3 className='modal-info-1 mt-4'>{selectedItem.name}</h3>
                                </div>
                            </div>
                            <div className="">
                                {/* <div className='d-flex justify-content-center'>
                                    {selectedItem.firstPrice && (
                                        <h5 className='modal-info-2'>{selectedItem.firstPrice}₺</h5>
                                    )}
                                    <div className='discount'> 
                                        <h6 style={{fontSize:"0.7rem"}} className='m-0'>%20 İNDİRİM</h6>
                                    </div>
                                </div> */}
                                <h4 className='modal-info-4'>{selectedItem.price} {selectedItem.currency}{/* {selectedItem.month && (<span className='month'>/aylık</span>)} */}</h4>
                                <h6>Kredi kartına Ayda 12 Taksit!</h6>
                            </div>
                            {/* <ul style={{listStyle:"none"}} className='mt-1 ps-3'>
                                {selectedItem.info1 && (
                                    <li>
                                        <h5 className='modal-info-3'>{selectedItem.info1}</h5>
                                    </li>
                                )}
                                {selectedItem.info2 && (
                                    <li>
                                        <h5 className='modal-info-3'>{selectedItem.info2}</h5>
                                    </li>
                                )}
                                {selectedItem.info3 && (
                                    <li>
                                        <h5 className='modal-info-3'>{selectedItem.info3}</h5>
                                    </li>
                                )}
                                {selectedItem.info4 && (
                                    <li>
                                        <h5 className='modal-info-3'>{selectedItem.info4}</h5>
                                    </li>
                                )}
                            </ul> */}
                            <div className='d-flex justify-content-center'>
                                <button onClick={purchaseService} className='satin-al mt-1 d-flex' type="">Satın Al</button>  
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="col-12 col-lg-6 m-auto d-flex justify-content-center">
                                <img className='service-img fadeIn' src={require(`../Assets/services/${selectedItem.code}.png`)} alt="" />
                        </div>
                    </SwiperSlide>
                </Swiper>
                    
                    </div>
                </>)

                }
           
            </div>
        </div>
    
    );
    };

export default Plan1;