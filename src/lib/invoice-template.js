export const generateInvoiceHTML = (order, locale, userName) => {
  const isEn = locale === "en";

  const productsHtml = order?.items
    ?.map(
      (item) => `
<tr>
  <!-- Product Image -->
  <td
    style="
      width: 14%;
      padding: 12px 10px 12px 20px;
      vertical-align: top;
    "
  >
    <img
      src="${item?.variant?.media_path || "https://ux.intersmarthosting.in/Mailers/Bosq/prod-1.png"}"
      width="66"
      height="55"
      alt="image"
      style="object-fit: cover; display: block;"
    />
  </td>

  <!-- Product Info -->
  <td
    style="
      width: 66%;
      padding: 12px 10px;
      vertical-align: top;
    "
  >
    <p
      style="
        font-size: 16px;
        font-family: 'Open Sans', sans-serif;
        color: #282828;
        font-weight: 400;
        margin: 0 0 6px 0;
      "
    >
      ${isEn ? item?.variant?.title : item?.variant?.title_ar || item?.variant?.title}
    </p>

    <p
      style="
        font-size: 14px;
        font-family: 'Open Sans', sans-serif;
        color: #666;
        font-weight: 400;
        margin: 0;
      "
    >
      Qty : ${item?.quantity || 0}
    </p>
  </td>

  <!-- Price -->
  <td
    style="
      width: 20%;
      padding: 12px 20px 12px 10px;
      vertical-align: top;
      text-align: right;
    "
  >
    <p
      style="
        font-family: 'Open Sans', sans-serif;
        font-size: 16px;
        color: #191919;
        margin: 0;
        font-weight: 400;
        text-align: right;
      "
    >
      AED ${item?.line_total || 0}
    </p>
  </td>
</tr>
`,
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
    <title>Invoice - ${order?.order_id}</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap');
         body, p, h1, h2, h3, h4, h5, h6 {
            font-family: "Open Sans", sans-serif;
            font-weight: 400;
        }
    </style>
</head>
<body bgcolor="#FFFFFF" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
    <div style="margin:auto; width:700px;background: #ffffff;">
        <table id="Table_01" width="700" border="0" cellpadding="0" cellspacing="0" align="center">
           <tbody>
                                <tr>
                                    <td style="width: 100%; margin: auto;">
                                        <table style="width: 100%; margin: auto;">
                                            <tbody>
                                                <tr>
                                                    <td
                                                        style="display: block; width: 700px; margin: 0 auto; padding: 30px 0; background: #282828; text-align: center;">
                                                        <img src="/images/brand-logo.svg"
                                                            width="132px" height="40" alt="banner"
                                                            style="display:block; margin:0 auto; object-fit:contain;"
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0 40px 20px;">
                                        <table width="530" style="margin: auto;">
                                            <tbody>
                                                <tr>
                                                    <td style="text-align:center;padding: 0;">
                                                        <h2 style="font-size: 22px; font-family: 'Open Sans', sans-serif; color: #282828; font-weight: 500; margin: 0px; margin-top: 27px; margin-bottom: 6px; line-height: 25px; text-align: center;">
                                                            Order Confirmed !
                                                        </h2>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0 30px;">
                                        <table width="640" style="margin: auto 0;">
                                            <tbody>
                                                <tr>
                                                    <td style="text-align:center;padding: 0;">
                                                        <h2 style="font-size: 16px; font-family: 'Open Sans', sans-serif; color: #282828; font-weight: 500; text-align: center; margin: 0; margin-bottom: 22px;">
                                                            Dear ${userName},
                                                        </h2>
                                                        <p style="font-size: 16px; color: #282828; font-weight: 400; font-family: 'Open Sans', sans-serif; width: 90%; margin: 0 auto 24px; line-height: 25px; text-align: center;">
                                                            Thank you for choosing Bosq for your office seating needs! We're delighted to confirm that your office chair order has been successfully placed and is now being prepared for delivery.
                                                        </p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <table style="width: 700px;">
                            <tbody>
                                <tr>
                                    <td style="text-align:center;padding: 0;">
                                        <h2 style="font-size: 22px; font-family: 'Open Sans', sans-serif; color: #282828; font-weight: 500; margin: 0px; margin-top: 27px; margin-bottom: 20px; line-height: 25px; text-align: center;">
                                            Order Details
                                        </h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="margin: auto; padding: 0 30px">
                                        <table style="width: 100%; margin: auto; height: auto; margin-bottom: 32px; border-collapse: separate; ">
                                            <tbody>
                                                <tr>
                                                    <td style="width: 50%; height: 100%; margin-top: 0px; padding-right: 10px; vertical-align: middle; border-radius: 4px;">
                                                        <div style="background:#F2F2F2; border:1px solid #e5e5e5; padding:20px; height: 100%; min-height: 245px;">
                                                            <h2 style="font-size: 16px; font-family: 'Open Sans', sans-serif; color: #282828; font-weight: 500; margin: 0; margin-bottom: 20px;">
                                                                Order Information 
                                                            </h2>
                                                            <table style="width: 100%; padding: 0; margin: 0; border-collapse: collapse;">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding-bottom: 15px; font-size: 14px; color: #282828; font-family: 'Open Sans', sans-serif;">Order ID:</td>
                                                                        <td style="padding-bottom: 15px; text-align: right; font-size: 14px; font-weight: 600; color: #282828; font-family: 'Open Sans', sans-serif;">#${order?.order_id}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="padding-bottom: 15px; font-size: 14px; color: #282828; font-family: 'Open Sans', sans-serif;">Order Date:</td>
                                                                        <td style="padding-bottom: 15px; text-align: right; font-size: 14px; font-weight: 600; color: #282828; font-family: 'Open Sans', sans-serif;">${order?.createdAt}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="padding-bottom: 15px; font-size: 14px; color: #282828; font-family: 'Open Sans', sans-serif;">Payment:</td>
                                                                        <td style="padding-bottom: 15px; text-align: right; font-size: 14px; font-weight: 600; color: #282828; font-family: 'Open Sans', sans-serif;">${order?.payment_status}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="font-size: 14px; color: #282828; font-family: 'Open Sans', sans-serif;">Est. Delivery:</td>
                                                                        <td style="text-align: right; font-size: 14px; font-weight: 600; color: #282828; font-family: 'Open Sans', sans-serif;">${order?.est_delivery_details}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>    
                                                    </td>
                                                    <td style="width: 50%; height: 100%; margin-top: 0px; padding-right: 10px; vertical-align: middle; border-radius: 4px;">
                                                        <div style="background:#F2F2F2; border:1px solid #e5e5e5; padding:20px; height: 100%; min-height: 245px;">
                                                            <table style="width: 100%; height: 100%; min-height: 240px;">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="vertical-align: top;">
                                                                            <h2 style="font-size: 16px; font-family: 'Open Sans', sans-serif; color: #282828; font-weight: 500; margin-bottom: 12px; margin-top: 0;">
                                                                                Billing Address
                                                                            </h2>
                                                                            <div style="font-size: 14px; color: #282828; font-weight: 400; font-family: 'Open Sans', sans-serif; line-height: 20px; margin: 0;">
                                                                                ${order?.billing_address || "Not available"}
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="vertical-align: bottom;">
                                                                            <h2 style="font-size: 16px; font-family: 'Open Sans', sans-serif; color: #282828; font-weight: 500; margin-bottom: 12px; margin-top: 0;">
                                                                                Shipping Address
                                                                            </h2>
                                                                            <div style="font-size: 14px; color: #282828; font-weight: 400; font-family: 'Open Sans', sans-serif; line-height: 20px; margin: 0;">
                                                                                ${order?.shipping_address || "Not available"}
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                      <table
  style="
    width: 100%;
    margin: auto;
    background-color: #fff;
    margin-bottom: 30px;
    border: solid 1px #efeeee;
    border-collapse: collapse;
  "
>
  <tbody>
    <tr>
      <td colspan="3" style="padding: 20px;">
        <h2
          style="
            font-size: 16px;
            font-family: 'Open Sans', sans-serif;
            color: #282828;
            font-weight: 500;
            margin: 0 0 10px 0;
            white-space: nowrap;
          "
        >
          Products (${order?.items?.length || 0} Items)
        </h2>
      </td>
    </tr>

    ${productsHtml}

    <tr>
      <td colspan="3" style="padding: 0 20px;">
        <hr
          style="
            border: none;
            border-top: solid 0.5px #f5f5f5;
            width: 100%;
            margin: 15px 0;
          "
        />
      </td>
    </tr>

    <tr>
      <td colspan="2" style="padding: 0 20px 20px 20px;">
        <p
          style="
            font-size: 16px;
            font-family: 'Open Sans', sans-serif;
            color: #282828;
            font-weight: 400;
            margin: 0;
          "
        >
          Total Amount
          <span style="color: #BBBCBC;">( Inc Tax )</span>
        </p>
      </td>

      <td style="padding: 0 20px 20px 0; text-align: right;">
        <p
          style="
            font-family: 'Open Sans', sans-serif;
            font-size: 16px;
            color: #191919;
            margin: 0;
            font-weight: 400;
          "
        >
          AED ${order?.grand_total || 0}
        </p>
      </td>
    </tr>
  </tbody>
</table>
                                        <table style="width: 100%; margin: auto; height: auto; border-radius: 15px; margin-bottom: 30px;">
                                            <tbody>
                                                <tr>
                                                    <td style="width: 100%; margin-top: 0px; vertical-align: top;">
                                                        <p style="font-size: 16px; font-family: 'Open Sans', sans-serif; color: #282828; text-align: center; font-weight: 400; margin: 0; margin-bottom: 0;">
                                                           Your office chairs will be delivered assembled and ready to use with professional setup service included.
                                                        </p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        
                                        <table style="width: 100%; margin: auto; height: auto; border-radius: 15px; margin-bottom: 30px;">
                                            <tbody>
                                                <tr>
                                                    <td style="width: 100%; margin-top: 0px; vertical-align: top;">
                                                        <p style="font-size: 16px; font-family: 'Open Sans', sans-serif; color: #282828; text-align: center; font-weight: 500; margin: 0; margin-bottom: 0;">
                                                           <span style="color: #282828; font-weight: 400;">For immediate assistance with office chair selection,</span> <br>call us at +971 56 503 6378 or email sales@bosq.ae
                                                        </p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td style="padding: 0">
                        <table width="700" style="margin: auto; background: #282828; padding: 20px 30px;">
                            <tbody>
                               <tr>
                                                <td>
                                                    <table align="center"  width="120" border="0" cellpadding="0" cellspacing="0" style="padding: 0; background: #282828; margin-bottom: 10px;">
                                                        <tbody>
                                                            <tr>
                                                                <td width="5%"
                                                                    style="padding-left: 0px; text-align: center; padding-left: 0;">
                                                                    <a href="#!" target="_blank"
                                                                        style="text-decoration: none;border-radius: 50%;width: 18px;height: 18px; margin: 0 auto"><img
                                                                            src="https://ux.intersmarthosting.in/Mailers/Bosq/fb.png"
                                                                            alt="social" width="14px" height="14px"
                                                                            style="object-fit:contain"></a>
                                                                </td>
                                                                <td width="5%"
                                                                    style="padding-left: 0px; text-align: center; padding-left: 0;">
                                                                    <a href="#!" target="_blank"
                                                                        style="text-decoration: none;border-radius: 50%;width: 18px;height: 18px; margin: 0 auto"><img
                                                                            src="https://ux.intersmarthosting.in/Mailers/Bosq/insta.png"
                                                                            alt="social" width="14px" height="14px"
                                                                            style="object-fit:contain"></a>
                                                                    </td>
                                                                <td width="5%"
                                                                    style="padding-left: 0px; text-align: center; padding-left: 0;">
                                                                    <a href="#!" target="_blank"
                                                                        style="text-decoration: none;border-radius: 50%;width: 18px;height: 18px; margin: 0 auto"><img
                                                                            src="https://ux.intersmarthosting.in/Mailers/Bosq/youtube.png"
                                                                            alt="social" width="14px" height="14px"
                                                                            style="object-fit:contain"></a>
                                                                </td>
                                                                <td width="5%"
                                                                    style="padding-left: 0px; text-align: center; padding-left: 0;">
                                                                    <a href="#!" target="_blank"
                                                                        style="text-decoration: none;border-radius: 50%;width: 18px;height: 18px; margin: 0 auto"><img
                                                                            src="https://ux.intersmarthosting.in/Mailers/Bosq/linkedin.png"
                                                                            alt="social" width="14px" height="14px"
                                                                            style="object-fit:contain"></a>
                                                                </td>

                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                            <tr>
                                    <td>
                                        <p style="margin: 0; color: #ffffff; font-size: 16px; font-family: 'Open Sans', sans-serif; text-align: center;">© 2025 Bosq. All rights reserved.</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</body>
</html>
  `;
};
