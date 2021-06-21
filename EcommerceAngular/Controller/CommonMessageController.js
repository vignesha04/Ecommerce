
function AdminLoginMessages(value) {

    var vMessage1 = "Please enter the Username and Password";
    var vMessage2 = "Please enter the Username";
    var vMessage3 = "Please enter the Password";
    var vMessage4 = "Invalid Login. Please enter correct Username and Password";

    if (value == 1)
        return vMessage1;
    else if (value == 2)
        return vMessage2;
    else if (value == 3)
        return vMessage3;
    else if (value == 4)
        return vMessage4;

}

function AddDetailMessages(value) {
    var vMessage1 = "Advertisement Details Added Successfully";
    var vMessage2 = "Please Enter the AddName";
    var vMessage3 = "Please Enter the valid Link";
    var vMessage4 = "Please Upload the Image File";
    var vMessage5 = "Please Enter the valid Link";
    var vMessage6 = "You must select an image file only";
    var vMessage7 = "Please Choose the valid Image File";
    var vMessage8 = "Advertisement Details Updated Successfully";

    if (value == 1)
        return vMessage1;
    else if (value == 2)
        return vMessage2;
    else if (value == 3)
        return vMessage3;
    else if (value == 4)
        return vMessage4;
    if (value == 5)
        return vMessage5;
    else if (value == 6)
        return vMessage6;
    else if (value == 7)
        return vMessage7;
    else if (value == 8)
        return vMessage8;

}

//------------- Discount commomnmessage----------


function DiscountDetailMessages(value) {
    var vMessage1 = "Please Enter the Discount Name";
    var vMessage2 = "Please Enter the valid DiscountPercentage";
    var vMessage3 = "Please Enter the ValidFrom Date should be greater than current date";
    var vMessage4 = "Please Enter ValidTo date should be greater than or equal to validfrom date";
    var vMessage5 = "Discount Name is already exist";
    var vMessage6 = "Discount Details Added SuccessFully";
    var vMessage7 = "Discount Details Updated SuccessFully";
    var vMessage8 = "Please Enter the validFrom date";
    var vMessage9 = "Please Enter the validTo date";
    var vMessage10 = "Please Enter ValidTo date should be greater than validfrom date or current date";


    if (value == 1)
        return vMessage1;
    else if (value == 2)
        return vMessage2;
    else if (value == 3)
        return vMessage3;
    else if (value == 4)
        return vMessage4;
    if (value == 5)
        return vMessage5;
    else if (value == 6)
        return vMessage6;
    else if (value == 7)
        return vMessage7;
    else if (value == 8)
        return vMessage8;
    else if (value == 9)
        return vMessage9;
    else if (value == 10)
        return vMessage10;
}

function SiteSettingsMessages(value) {
    var vMessage1 = "Please Enter the DateFormat";
    var vMessage2 = "Please Enter the CurrencyType";
    var vMessage3 = "Please Enter the GridSizeAdmin";
    var vMessage4 = "Please Enter the GridSizeClient";
    var vMessage5 = "Please Enter the ButtonColorAdmin";
    var vMessage6 = "Please Enter the CaptchaType";
    var vMessage7 = "Inserted successfully";
    var vMessage8 = "Updated Setting Successfully";

    if (value == 1)
        return vMessage1;
    else if (value == 2)
        return vMessage2;
    else if (value == 3)
        return vMessage3;
    else if (value == 4)
        return vMessage4;
    if (value == 5)
        return vMessage5;
    else if (value == 6)
        return vMessage6;
    else if (value == 7)
        return vMessage7;
    if (value == 8)
        return vMessage8;

}

function StockManagementMessages(value) {
    var vMessage1 = "Please Select the Category";
    var vMessage2 = "Please Select the SubCategory";
    var vMessage3 = "Please Select the Product";
    var vMessage4 = "Please Enter the StockCount";
    var vMessage5 = "product is already exist";
    var vMessage6 = "Inserted ProductStock successfully";
    var vMessage7 = "Updated ProductStock Successfully";


    if (value == 1)
        return vMessage1;
    else if (value == 2)
        return vMessage2;
    else if (value == 3)
        return vMessage3;
    else if (value == 4)
        return vMessage4;
    if (value == 5)
        return vMessage5;
    else if (value == 6)
        return vMessage6;
    else if (value == 7)
        return vMessage7;

}

function CopyRightAdminMessages(value) {
    var vMessage1 = "Please Enter the CopyRight";
    var vMessage2 = "Copyright Updated Successfully";



    if (value == 1)
        return vMessage1;
    else if (value == 2)
        return vMessage2;



}


//Coupon Code Messages
function CouponCodeMessages(value) {

    var vMessage1 = "Please enter the Coupon Name";
    var vMessage2 = "Please enter the Coupon Code";
    var vMessage3 = "Please enter the Description";
    var vMessage4 = "Please enter the Percentag Between 0 to 100";
    var vMessage5 = "Please Enter the ValidFrom Date should be greater than or equal to current date";
    var vMessage6 = "Please Enter ValidTo date should be greater than validfrom date";
    var vMessage7 = "Coupon Code Save Successfully";
    var vMessage8 = "Coupon Code Updated Successfully";
    var vMessage9 = "Please Enter Valid Date date";
    var vMessage10 = "Please Enter Valid Date date";
    var vMessage11 = "Please Enter ValidTo date should be greater than validfrom date or Current Date";


    if (value == 1)
        return vMessage1;
    else if (value == 2)
        return vMessage2;
    else if (value == 3)
        return vMessage3;
    else if (value == 4)
        return vMessage4;
    else if (value == 5)
        return vMessage5;
    else if (value == 6)
        return vMessage6;
    else if (value == 7)
        return vMessage7;
    else if (value == 8)
        return vMessage8;
    else if (value == 9)
        return vMessage9;
    else if (value == 10)
        return vMessage10;
    else if (value == 11)
        return vMessage11;
}

function TermsandConditionMessages(value) {

    var vMessage1 = "Terms & Condition Saved Successfully";
    var vMessage2 = "Terms & Condition Updated Successfully";
    var vMessage3 = "Please enter the Password";
    var vMessage4 = "Invalid Login. Please enter correct Username and Password";

    if (value == 1)
        return vMessage1;
    else if (value == 2)
        return vMessage2;
    else if (value == 3)
        return vMessage3;
    else if (value == 4)
        return vMessage4;

}
//------------- category commomnmessage----------

function CategoryMessages(value) {

    var vMessage1 = "Please Enter the CategoryName";
    var vMessage2 = "This Category is Already Used";
    var vMessage3 = "Category Added Successfully";
    var vMessage4 = "Category Updated Successfully";
    var vMessage5 = "This Category is already used in Subcategory";

    if (value == 1)
        return vMessage1;
    else if (value == 2)
        return vMessage2;
    else if (value == 3)
        return vMessage3;
    else if (value == 4)
        return vMessage4;
    else if (value == 5)
        return vMessage5;

}
function AboutUsAdminMessages(value) {

    var vMessage1 = "AboutUsAdmin Details Added Successfully";
    var vMessage2 = "Please Upload the Image File";
    var vMessage3 = "Please Enter the Description";
    var vMessage4 = "please upload correct File Name, File extension should be .png, .jpeg or .gif";
    var vMessage5 = "Updated AboutUs Successfully";
    var vMessage6 = "You must select an image file only";

    if (value == 1)
        return vMessage1;
    else if (value == 2)
        return vMessage2;
    else if (value == 3)
        return vMessage3;
    else if (value == 4)
        return vMessage4;
    else if (value == 5)
        return vMessage5;
    else if (value == 6)
        return vMessage6;
}
function HomePageConfigMessages(value) {

    var vMessage1 = "You can upload a minimum of 5 files";
    var vMessage2 = "Homepage Setting Details Added Successfully";
    var vMessage3 = "Updated Homepage Setting Details Successfully";
    var vMessage4 = "please upload correct File Name, File extension should be .png, .jpeg or .gif";
    var vMessage5 = "You must select an image file only";

    if (value == 1)
        return vMessage1;
    else if (value == 2)
        return vMessage2;
    else if (value == 3)
        return vMessage3;
    else if (value == 4)
        return vMessage4;
    else if (value == 5)
        return vMessage5;

}
function TaxDetailMessages(value) {

    var vMessage1 = "Please Enter the Tax Name";
    var vMessage2 = "Please Enter the Percentage between 0 to 100";
    var vMessage3 = "Tax Name is already exist";
    var vMessage4 = "TaxDetail Added Successfully";
    var vMessage5 = "TaxDetail Updated Successfully";

    if (value == 1)
        return vMessage1;
    else if (value == 2)
        return vMessage2;
    else if (value == 3)
        return vMessage3;
    else if (value == 4)
        return vMessage4;
    else if (value == 5)
        return vMessage5;
}
function ProductConfigurationMessages(value) {

    var vMessage1 = "Please Select the Types";
    var vMessage2 = "Please Select Your Choice";
    var vMessage3 = "Please Select  the  Category";
    var vMessage4 = "Please Enter the SubCategory";
    var vMessage5 = "Submitted Successfully";

    if (value == 1)
        return vMessage1;
    else if (value == 2)
        return vMessage2;
    else if (value == 3)
        return vMessage3;
    else if (value == 4)
        return vMessage4;
    else if (value == 5)
        return vMessage5;
}

function ProductDetailMessages(value) {
    var vMessage1 = "Please Enter the Title";
    var vMessage2 = "Please Enter the Description";
    var vMessage3 = "Please Enter the Price";
    var vMessage4 = "This Description is already used";
    var vMessage5 = "Product details Added  successfully";
    var vMessage6 = "You can only upload a minimum of 2 files";
    //var vMessage7 = "Please Select Minimum 2 Images";
    var vMessage7 = "File should be between 1MB";
    var vMessage8 = "Please upload the correct File Name, File extension should be .png, .jpeg or .gif";
    var vMessage9 = "Updated ProductDetails successfully";
    var vMessage10 = "Please Selct the Category";
    var vMessage11 = "Please Selct the SubCategory";

    if (value == 1)
        return vMessage1;
    else if (value == 2)
        return vMessage2;
    else if (value == 3)
        return vMessage3;
    else if (value == 4)
        return vMessage4;
    else if (value == 5)
        return vMessage5;
    else if (value == 6)
        return vMessage6;
    else if (value == 7)
        return vMessage7;
    else if (value == 8)
        return vMessage8;
    else if (value == 9)
        return vMessage9;
    else if (value == 10)
        return vMessage10;
    else if (value == 11)
        return vMessage11;

}
function ContactUsAdminMessages(value) {
    var vMessage1 = "Please Select the Address";
    var vMessage2 = "Please Select the Address1";
    var vMessage3 = "Please Enter the EmailId"
    var vMessage4 = "Please Enter the ContactNo";
    var vMessage5 = "Please Enter a Description";
    var vMessage6 = "This EmailId is not valid";
    var vMessage7 = "Please Enter a valid ContactNo";
    var vMessage8 = "This Contact detail already exist";
    var vMessage9 = "Added Contact Details Successfully"
    var vMessage10 = "Updated Contact Details Successfully";
    if (value == 1)
        return vMessage1;
    else if (value == 2)
        return vMessage2;
    else if (value == 3)
        return vMessage3;
    else if (value == 4)
        return vMessage4;
    else if (value == 5)
        return vMessage5;
    else if (value == 6)
        return vMessage6;
    else if (value == 7)
        return vMessage7;
    else if (value == 8)
        return vMessage8;
    else if (value == 9)
        return vMessage9;
    else if (value == 10)
        return vMessage10;

}
function SocialMediaMessages(value) {
    var vMessage1 = "Please Enter the SocialMediaId";
    var vMessage2 = 'Please Enter the SocialMedia Link';
    var vMessage3 = "Please Enter the valid Link";
    var vMessage4 = "This Socialmedia Link already exist";
    var vMessage5 = "Social Media Added successfully";
    var vMessage6 = "Updated SocialMediaLink Successfully";
    var vMessage7 = "Deleted SocialMediaLink Successfully"
    if (value == 1)
        return vMessage1;
    else if (value == 2)
        return vMessage2;
    else if (value == 3)
        return vMessage3;
    else if (value == 4)
        return vMessage4;
    else if (value == 5)
        return vMessage5;
    else if (value == 6)
        return vMessage6;
    else if (value == 7)
        return vMessage7;
}

function SubCategoryMessages(value) {
    var vMessage1 = "Please Select the Category";
    var vMessage2 = "Please Enter the Subcategoryname";
    var vMessage3 = "This SubCategory already exists";
    var vMessage4 = "Added Subcategory Successfully";
    var vMessage5 = "Updated Subcategory Successfully";
    var vMessage6 = "This Subcategory is already used in the product";
    if (value == 1)
        return vMessage1;
    else if (value == 2)
        return vMessage2;
    else if (value == 3)
        return vMessage3;
    else if (value == 4)
        return vMessage4;
    else if (value == 5)
        return vMessage5;
    else if (value == 6)
        return vMessage6;


}
function CategoryMessages(value) {

    var vMessage1 = "Please Enter the CategoryName";
    var vMessage2 = "This Category is Already Used";
    var vMessage3 = "Category Added Successfully";
    var vMessage4 = "Category Updated Successfully";


    var vMessage5 = "This Category is already used in the Subcategory";  //  this line add to error message page.

    if (value == 1)
        return vMessage1;
    else if (value == 2)
        return vMessage2;
    else if (value == 3)
        return vMessage3;
    else if (value == 4)
        return vMessage4;

    else if (value == 5)  //  this line add to error message page.
        return vMessage5;  //  this line add to error message page.

} 
function CompanydetailMessages(value) {
    var vMessage1 = "Please Enter the CompanyName";
    var vMessage2 = "Please Enter the AddressLine1";
    var vMessage3 = "Please Enter the AddressLine2";
    var vMessage4 = "Please Enter the CountryName";
    var vMessage5 = "Please Enter the State";
    var vMessage6 = "Please Enter the City";
    var vMessage7 = "Please Enter the PinCode";
    var vMessage8 = "Please Enter the GSTNo";
    var vMessage9 = "Please Enter the CINno";
    var vMessage10 = "Please Enter the PhoneNumber";
    var vMessage11 = "Please Enter the EmailId";
    var vMessage12 = "Company Name already exists";
    var vMessage13 = "Company details added successfully";
    var vMessage14 = "Company details updated successfully";
    var vMessage15 = "Please enter a valid EmailId ";
    var vMessage16 = "Please enter a valid contact number";
    var vMessage17 = "Please Enter the valid GSTNo ";
    var vMessage18 = "Please Enter the valid Pincode";
    var vMessage19 = "Please Enter the valid CINno ";
    var vMessage20 = "Please Upload the Image File; ";
    var vMessage21 = "You must select an image file only";
    var vMessage22 = "please upload correct File Name, File extension should be .png, .jpeg  or .gif ";
    var vMessage23 = "Please enter the Website Link";
    var vMessage24 = "Please enter a valid Link";
    var vMessage25 = "Single and double quotes are not allowed ";

    if (value == 1)
        return vMessage1;
    else if (value == 2)
        return vMessage2;
    else if (value == 3)
        return vMessage3;
    else if (value == 4)
        return vMessage4;
    else if (value == 5)
        return vMessage5;
    else if (value == 5)
        return vMessage4;
    else if (value == 6)
        return vMessage6;
    else if (value == 7)
        return vMessage7;
    else if (value == 8)
        return vMessage8;
    else if (value == 9)
        return vMessage9;
    else if (value == 10)
        return vMessage10;
    else if (value == 11)
        return vMessage11;
    else if (value == 12)
        return vMessage12;
    else if (value == 13)
        return vMessage13;
    else if (value == 14)
        return vMessage14;
    else if (value == 15)
        return vMessage15;
    else if (value == 16)
        return vMessage16;
    else if (value == 17)
        return vMessage17;
    else if (value == 18)
        return vMessage18;
    else if (value == 19)
        return vMessage19;
    else if (value == 20)
        return vMessage20;
    else if (value == 21)
        return vMessage21;
    else if (value == 22)
        return vMessage22;
    else if (value == 23)
        return vMessage23;
    else if (value == 24)
        return vMessage24;
    else if (value == 25)
        return vMessage25;
}
function CourierDetailMessage(value) {
    var vMessage1 = "Please select the Member Name";
    var vMessage2 = "Please select the Order Number";
    var vMessage3 = "Please Enter the Courier Name";
    var vMessage4 = "Please Enter the Courier Number";
    var vMessage5 = "Please Enter the  BookedDate";
    var vMessage6 = "Please Enter a Description";
    var vMessage7 = "Courier Details Added Successfully";

    if (value == 1)
        return vMessage1;
    else if (value == 2)
        return vMessage2;
    else if (value == 3)
        return vMessage3;
    else if (value == 4)
        return vMessage4;
    else if (value == 5)
        return vMessage5;
    else if (value == 6)
        return vMessage6;
    else if (value == 7)
        return vMessage7;
}


function TermsandConditionInvoiceMessages(value) {
    var vMessage1 = "Terms & Condition Invoice Saved Successfully";
    var vMessage2 = "Terms & Condition Invoice Updated Successfully";
    if (value == 1)
        return vMessage1;
    else if (value == 2)
        return vMessage2;
}

function SalesReportMessages(value) {
    var vMessage1 = "Please Enter ToDate date should be greater than validfrom date";

    if (value == 1)
        return vMessage1;

}

function DeliveryChargesMessages(value) {
    var vMessage1 = "DeliveryCharges Added Successfully";
    var vMessage2 = "Please Enter the Qty";
    var vMessage3 = "Please Enter the Price";
    var vMessage4 = "DeliveryCharges Updated Successfully";

    if (value == 1)
        return vMessage1;
    if (value == 2)
        return vMessage2;
    if (value == 3)
        return vMessage3;
    if (value == 4)
        return vMessage4;

}