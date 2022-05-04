const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../shared/mongodb')

data = async () => {
    let flipkart = [];
    await axios.get('https://www.flipkart.com/search?q=mobiles&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off')
        .then((res) => {
            const $ = cheerio.load(res.data);
            let count = 0;
            $("._1AtVbE").each((index, ele) => {
                if (count < 10) {
                    let productName = $(ele).find("div._4rR01T").text()
                    let productImage = $(ele).find("div.CXW8mj").children().attr("src")
                    let productRating = $(ele).find("div._3LWZlK").text()
                    let productPrice = $(ele).find("div._3I9_wc").text()
                    let offerPrice = $(ele).find("div._30jeq3").text()
                    if (productName !== "" || productPrice !== "" || offerPrice !== "") {
                        flipkart[count] = {
                            productName,
                            productImage,
                            productRating,
                            productPrice,
                            offerPrice,
                        }
                        count++;
                    }
                }
            })
            db.mobile.insertMany(flipkart)
        })
        .catch((error) => {
            console.log(error)
        }) 

     let amazon = [];
    await axios.get("https://www.amazon.in/s?k=mobiles&rh=n%3A1389401031&ref=nb_sb_noss")
        .then((res) => {
            const $ = cheerio.load(res.data);
            let count = 0;
            $(".a-section").each((index, ele) => {
                if (count < 10) {
                    let productName = $(ele).find("span.a-text-normal").text()
                    let productImage = $(ele).find("div.a-section").children().attr("src")
                    let productRating = $(ele).find(".a-icon-star-small").children().text()
                    let productPrice = $(ele).find("span.a-text-price").children("span.a-offscreen").text()
                    let offerPrice = $(ele).find("span.a-price-whole").text()
                    if (productName !== "" || productPrice !== "" || offerPrice !== "") {
                        amazon[count] = {
                            productName,
                            productImage,
                            productRating,
                            productPrice,
                            offerPrice,
                        }
                        count++;
                    }
                }
            })
            db.mobile.insertMany(amazon)
        })
        .catch((err) => console.log(err)) 

    // Fetch Details From SnapDeal : 

    let snapdeal = [];
    await axios.get("https://www.snapdeal.com/search?keyword=mobile%20phone&santizedKeyword=&catId=&categoryId=0&suggested=true&vertical=&noOfResults=20&searchState=&clickSrc=suggested&lastKeyword=&prodCatId=&changeBackToAll=false&foundInAll=false&categoryIdSearched=&cityPageUrl=&categoryUrl=&url=&utmContent=&dealDetail=&sort=plrty")
        .then(res => {

            const $ = cheerio.load(res.data);

            let count = 0;
            $(".favDp").each((index, element) => {
                if (count < 10) {
                    let productTitle = $(element).find("p.product-title").text();
                    let productImage = $(element).find(".picture-elem source").attr("srcset");
                    let productRating = "NA";
                    let productPrice = $(element).find("span.product-desc-price").text();
                    let offerPrice = $(element).find("span.product-price").text();

                    if (productTitle !== "" || productPrice !== "" || offerPrice !== "") {
                        snapdeal[count] = {
                            productTitle,
                            productImage,
                            productRating,
                            productPrice,
                            offerPrice,
                        }
                        count++;
                    }
                }
            })
            db.mobile.insertMany(snapdeal)
        }).catch(err => console.log(err));

}

module.exports = data
