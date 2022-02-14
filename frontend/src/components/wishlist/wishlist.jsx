import React, { useState, useEffect } from "react";
import "./wishlist.css";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setWishlist, deleteWishlist } from "../../reducer/wishlist/index";
import { IoIosAddCircle, IoMdRemoveCircle } from "react-icons/io";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Wishlist = (id) => {
  const [notes, setNotes] = useState([
    { myNote: "I have buy new wheel" },
    { myNote: "I have buy new paint brush" },
  ]);
  const [note, setNote] = useState("");

  const popupWishlistDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "blue",
      cancelButtonColor: "#d33",
      confirmButtonText: "Remove!",
      confirmButtonColor: "blue",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Removed!", "Your Item has been Removed.", "success");
        deleteWishlistById(id);
      }
    });
  };

  const popupCart = () => {
    Swal.fire({
      confirmButtonColor: "blue",

      title: "This Item Added To Your Cart Successfully",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };

  const dispatch = useDispatch();
  const { token, wishlists } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      wishlists: state.wishlistReducer.wishlists,
    };
  });

  const getWishlistById = async () => {
    await axios
      .get(`http://localhost:5000/wishlist/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setWishlist(result.data.results));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteWishlistById = async (id) => {
    //delete http://localhost:5000/wishlist/:id

    await axios
      .delete(`http://localhost:5000/wishlist/${id}`)
      .then((result) => {
        dispatch(deleteWishlist(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createNewCart = async (id) => {
    try {
      const result = await axios.post(
        `http://localhost:5000/cart`,
        { item_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {}
  };

  useEffect(() => {
    getWishlistById();
  }, []);
  return (
    <div className="cart">
      <div className="cart_nav_box">
        <ul>
          <li>
            <img
              src="https://its-london.s3-eu-west-1.amazonaws.com/assets/USPTickIcon.png"
              alt="Price match promise"
            />
            <span>Price match promise</span>
          </li>
          <li>
            <img
              src="https://its-london.s3-eu-west-1.amazonaws.com/assets/USPSDeliveryIcon.png"
              alt="ext day delivery, 7 days a week"
            />
            <span>Next day delivery, 7 days a week</span>
          </li>
          <li>
            <img
              src="https://its-london.s3-eu-west-1.amazonaws.com/assets/USPTrustpilotIcon.png"
              alt="5 Star Rating on Trustpilot"
            />
            <span>5 Star Rating on Trust pilot</span>
          </li>
          <li>
            <img
              src="https://its-london.s3-eu-west-1.amazonaws.com/assets/USPSHourIcon.png"
              alt="One Hour Delivery slot"
            />
            <span>One Hour Delivery slot</span>
          </li>
          <li>
            <img
              src="https://its-london.s3-eu-west-1.amazonaws.com/assets/USPDrillIcon.png"
              alt="Finance Available over £99 inc VAT"
            />
            <span>Finance Available over JD99 inc VAT</span>
          </li>
        </ul>
      </div>

      <dir className="cart_header">
        <div>
          <h1>Your Wishlist Items</h1>
        </div>
      </dir>

      {wishlists.length > 0 ? (
        wishlists.map((wishlist, index) => {
          return (
            <div key={index} className="wishlist_box">
              <div className="cart_img_box">
                <div className="info_center">
                  <img src={wishlist.img} alt={wishlist.title} />
                </div>

                <div className="cart_title">
                  <span>{wishlist.title}</span>
                </div>
              </div>
              <div className="info_center">
                <h3>Price</h3>
                <span>{wishlist.price} JOD</span>
              </div>
              <div className="info_box btn_box info_box_cart">
                <button
                  className="wishlist_btn"
                  style={{
                    borderColor: "#f22626",
                  }}
                  onClick={(e) => {
                    popupWishlistDelete(wishlist.wishlist_id);
                  }}
                >
                  <IoMdRemoveCircle className="icon_style_remove" /> wishlist
                </button>
                <button
                  className="wishlist_btn"
                  style={{
                    borderColor: "#43d63e",
                  }}
                  onClick={(e) => {
                    popupCart();

                    createNewCart(wishlist.item_id);
                  }}
                  style={{ display: `${wishlist.is_deleted ? "none" : null}` }}
                >
                  <IoIosAddCircle className="icon_style_add" />
                  To Cart
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div>No Wishlist Yet!</div>
      )}
    </div>
  );
};

export default Wishlist;
