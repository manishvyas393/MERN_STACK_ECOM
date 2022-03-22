import React, { Fragment } from 'react'
import { useState } from 'react'
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import "./shippinginfo.css"
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import CheckOutSteps from "../../cart/checkout-steps/CheckOutSteps"
import MetaData from "../.././layout/MetaData"
import { SaveShippingInfo } from '../../../actions/cartAction';
import { useNavigate } from 'react-router-dom';

const ShippingInfo = () => {
      const dispatch = useDispatch();
      const alert = useAlert()
      const navigate = useNavigate()
      const { shippingInfo } = useSelector(state => state.cart)
      const [address, setAddress] = useState(shippingInfo.address);
      const [city, setCity] = useState(shippingInfo.city);
      const [state, setState] = useState(shippingInfo.state);
      const [country, setCountry] = useState(shippingInfo.country);
      const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
      const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

      const shippingSubmit = () => {
            if (phoneNo.length < 10 || phoneNo.length > 10) {
                  alert.error("Phone Number should be 10 digits Long");
                  return;
            }
            dispatch(SaveShippingInfo({ address, city, state, country, pinCode, phoneNo }));
            navigate("/orders/confirm")
      }
      return (
            <Fragment>
                  <MetaData title="Shipping Details" />

                  <CheckOutSteps activeStep={0} />
                  <div className="ShippingContainer">
                        <div className="ShippingBox">
                              <h2 className="ShippingHeading">Shipping Details</h2>
                              <form className="ShippingForm" encType='multipart/form-data' onSubmit={shippingSubmit}>
                                    <div>
                                          <HomeIcon />
                                          <input type="text"
                                                value={address}
                                                required
                                                placeholder="Address"
                                                onChange={(e) => setAddress(e.target.value)} />
                                    </div>

                                    <div>
                                          <LocationCityIcon />
                                          <input type="text"
                                                value={city}
                                                required
                                                placeholder="City"
                                                onChange={(e) => setCity(e.target.value)} />
                                    </div>

                                    <div>
                                          <PinDropIcon />
                                          <input type="number"
                                                value={pinCode}
                                                required
                                                placeholder="Pin Code"
                                                onChange={(e) => setPinCode(e.target.value)} />
                                    </div>

                                    <div>
                                          <PhoneIcon />
                                          <input type="number"
                                                value={phoneNo}
                                                required
                                                placeholder="Contact Number"
                                                onChange={(e) => setPhoneNo(e.target.value)} />
                                    </div>
                                    <div>
                                          <PublicIcon />
                                          <select required value={country} onChange={(e) => setCountry(e.target.value)} className='select' >
                                                <option value="">Country</option>
                                                {
                                                      Country.getAllCountries().map((item) => (<option key={item.isoCode} value={item.isoCode}>
                                                            {item.name}
                                                      </option>))
                                                }
                                          </select>
                                    </div>

                                    <div>
                                          <TransferWithinAStationIcon />

                                          <select
                                                required
                                                value={state}
                                                onChange={(e) => setState(e.target.value)}
                                                className='select'
                                          >
                                                <option value="">State</option>
                                                {State &&
                                                      State.getStatesOfCountry(country).map((item) => (
                                                            <option key={item.isoCode} value={item.isoCode}>
                                                                  {item.name}
                                                            </option>
                                                      ))}
                                          </select>
                                    </div>
                                    <input
                                          type="submit"
                                          value="Continue"
                                          className="ShippingBtn"
                                          disabled={state ? false : true}
                                    />


                              </form>
                        </div>
                  </div>
            </Fragment>
      )
}

export default ShippingInfo
