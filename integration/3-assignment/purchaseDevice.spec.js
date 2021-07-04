/// <reference types="cypress"/>

it('Visit Website', function(){
    cy.visit("https://www.samsung.com/in/");
})

it('Select Mobile', function(){
    cy.get('.showcase-card-tab__inner > .tab > .tab__list').trigger("mouseover");
    cy.get('.showcase-card-tab__inner > .tab > .tab__list > :nth-child(2) > .tab__item-title').click();
    //click on the mobile
    cy.get('.swiper-slide-active > .showcase-card-tab-inner-container > :nth-child(3) > .showcase-card-tab-card__full-bleed-wrap > .showcase-card-tab-card__img-wrap > .showcase-card-tab-card__product-img').trigger('mouseover');
    cy.get('.swiper-slide-active > .showcase-card-tab-inner-container > :nth-child(3) > .showcase-card-tab-card__full-bleed-wrap > .showcase-card-tab-card__img-wrap > .showcase-card-tab-card__product-img > .image > .image__main').click();
})

it('Choose mobile specs', function(){
    //Exchange, yes/no (choose no)
    cy.get('.hubble-product__options-content-cta > .hubble-product__options-list-wrap').trigger("mouseover");
    cy.get('[title="Tell us your current brand to start trade-in! layer popup"] > .hubble-product__options-list-inner > .s-cta-text').click();

    //Device (choose Galaxy S21+ 5G)
    cy.get('.s-option-device > .hubble-product__options-content').trigger("mouseover");
    cy.get('.s-option-device > .hubble-product__options-content > .hubble-product__options-list-wrap > :nth-child(2) > .s-option-box > .hubble-pd-radio__label > .s-label > .s-label-inner').click();

    //Connectivity (choose 5G)
    cy.get(':nth-child(2) > .hubble-product__options-content > .hubble-product__options-list-wrap').trigger("mouseover");
    cy.get(':nth-child(2) > .hubble-product__options-content > .hubble-product__options-list-wrap > .hubble-product__options-list > .s-option-box > .hubble-pd-radio__label > .s-label > .s-label-inner').click();

    //Color (choose phantom black)
    cy.get('.hubble-product__options-color > :nth-child(1)').trigger("mouseover");
    cy.get(':nth-child(5) > .hubble-pd-radio > .hubble-pd-radio__label > .s-box > .s-box-inner').click();

    //Storage (choose 256GB)
    cy.get(':nth-child(4) > .hubble-product__options-content > .hubble-product__options-list-wrap').trigger("mouseover");
    cy.get(':nth-child(4) > .hubble-product__options-content > .hubble-product__options-list-wrap > :nth-child(2) > .s-option-box > .hubble-pd-radio__label > .s-label > .s-label-inner').click();

    //Add to cart
    cy.get('.hubble-product__total-wrap').trigger("mouseover");
    cy.get('.hubble-product__total-wrap > .hubble-product__total').trigger("mouseover");
    cy.get('.hubble-product__total-wrap > .hubble-product__total > .hubble-product__total-cta-wrap > .hubble-product__total-cta > .hubble-product__total-cta-inner > .s-hubble-total-cta > .cta').click();
    
})

it("Checkout", function(){
   //continue button
   cy.get('body').then($body => {
       if($body.find('.hubble-addon-page__top-inner')){ 
        if($body.find('.hubble-price-bar__price-cta > .cta'))
            cy.get('.hubble-addon-page__product-cta > .s-cta-wrap > .cta > .s-cta-text').click();
    }
       if($body.find('.os-action-holder > .btn')){
        cy.get('.order-summary-holder').trigger('mouseover');
        cy.get('.sticky-content').trigger('mouseover');
        cy.get('.os-action-holder > .btn').trigger('mouseover');
        cy.get('.os-action-holder > .btn').should('be.visible');
        cy.get('.os-action-holder > .btn').click();
        if(cy.get('.checkout-payment-header-title').contains("1 Item")){
            //fine- proceed
        } else{
            throw new error ("Items more than expected were added");
        }
       }
       
   })

    cy.get(':nth-child(1) > :nth-child(1) > :nth-child(1) > .form-control').type("FirstName");
    cy.get(':nth-child(1) > :nth-child(1) > :nth-child(2) > .form-control').type("Last");
    //adress
    cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > .form-control').click();
    //pincode
    cy.get('.pincode > .form-control').click();
    //email
    cy.get(':nth-child(4) > :nth-child(1) > :nth-child(2) > .form-control').click();
    //mobile
    cy.get(':nth-child(5) > :nth-child(1) > :nth-child(1) > .form-control').click();
    cy.get(':nth-child(5) > :nth-child(1) > :nth-child(1) > .form-control').type('1234567890');

    //address assertion
    cy.get(':nth-child(4) > :nth-child(1) > .error > .input-error-msg').should('be.visible').and('contain',"This is a required field");
    //pin code assertion 
    cy.get('.pincode > .input-error-msg').should('be.visible').and('contain',"This is a required field");
    //email assertion
    cy.get(':nth-child(2) > :nth-child(1) > .error > .input-error-msg').should('be.visible').and('contain',"This is a required field");

    // Now fill required fields
    cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > .form-control').type('Earth'); //address
    cy.get(':nth-child(4) > :nth-child(1) > .input-error-msg').should('not.exist');
    cy.get('.pincode > .form-control').type('110001'); //pin code
    cy.get('.pincode > .input-error-msg').should('not.be.visible');
    cy.get(':nth-child(4) > :nth-child(1) > :nth-child(2) > .form-control').type('dummy@mail.com'); // Email
    cy.get(':nth-child(2) > :nth-child(1) > .input-error-msg').should('not.exist');
    // choose home delivery
    cy.get(':nth-child(1) > label > .cc-box-checkbox').click();

    //click [save]
    cy.get('.btn-primary').click();
})