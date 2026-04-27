import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios"; //this is the fake version of axios
import Product from "./Product";

vi.mock("axios");
// this mock entire part of axios , make fake version of the axios so that it will not contact the backend

//mock the implementation = make the mock s=do whatever we want

describe("Product component", () => {
  //testing a component- integration test

  let product;

  let loadCart;

  let user;

    //testHook
  beforeEach(() => {
    product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };

    user = userEvent.setup();

    loadCart = vi.fn();
  });

  it("display the product details correctly", () => {
    // const product = {
    //   id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    //   image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    //   name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    //   rating: {
    //     stars: 4.5,
    //     count: 87,
    //   },
    //   priceCents: 1090,
    //   keywords: ["socks", "sports", "apparel"],
    // };

    // const loadCart = vi.fn();

    //vi.fn(); = create a fake function that doesnot do anything
    //load cart is associate with backend but in testing dont mesh with backend so we can create a mock means fake function
    // screen = check the fake web page

    render(<Product product={product} loadCart={loadCart} />);

    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs"),
    ).toBeInTheDocument();

    expect(screen.getByText("$10.90")).toBeInTheDocument();

    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg",
    );

    expect(screen.getByTestId("product-rating-stars")).toHaveAttribute(
      "src",
      "images/ratings/rating-45.png",
    );

    expect(screen.getByText("87")).toBeInTheDocument();
  });

  //test user integration

  it("adds a product to the cart", async () => {
    render(<Product product={product} loadCart={loadCart} />);

    
    const addToCartButton = screen.getByTestId("add-to-cart-button");
    await user.click(addToCartButton); //this simulate the click event
    // in our test we should not contact a real backend

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
    });

    expect(loadCart).toHaveBeenCalled();
  });


  it('select a quantity',async ()=>{

    render(<Product product={product} loadCart={loadCart} />)
    const quantitySelector = screen.getByTestId('product-quantity-selector');
    expect(quantitySelector).toHaveValue('1');

   
    await user.selectOptions(quantitySelector,'3')
    expect(quantitySelector).toHaveValue('3');

    const addToCartButton = screen.getByTestId("add-to-cart-button");
    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 3,
    });

    expect(loadCart).toHaveBeenCalled();
  })

});
