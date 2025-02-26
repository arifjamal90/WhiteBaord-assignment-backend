
const InvitationLink = (url,email) => {
	return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title></title>
  </head>
  <body style="width: 100% !important; height: 100%; margin: 0; -webkit-text-size-adjust: none; background-color: #F2F4F6; color: #51545E; font-family: 'Nunito Sans', Helvetica, Arial, sans-serif;">
    <span style="display: none !important; visibility: hidden; mso-hide: all; font-size: 1px; line-height: 1px; max-height: 0; max-width: 0; opacity: 0; overflow: hidden;">{{invite_sender_name}} with {{invite_sender_organization_name}} has invited you to use [Product Name] to collaborate with them.</span>
    <table style="width: 100%; margin: 0; padding: 0; background-color: #F2F4F6;" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center">
          <table style="width: 100%; margin: 0; padding: 0;" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td style="padding: 25px 0; text-align: center;">
                <a href="https://example.com" style="font-size: 16px; font-weight: bold; color: #A8AAAF; text-decoration: none; text-shadow: 0 1px 0 white;">
                  SquadMinds Pvt Ltd.
                </a>
              </td>
            </tr>
            <tr>
              <td style="width: 100%; margin: 0; padding: 0;">
                <table style="width: 570px; margin: 0 auto; padding: 0; background-color: #FFFFFF;" align="center" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td style="padding: 45px;">
                      <div style="font-family: 'Nunito Sans', Helvetica, Arial, sans-serif;">
                        <h1 style="margin-top: 0; color: #333333; font-size: 22px; font-weight: bold; text-align: left;">Hi, ${email}</h1>
                        <p style="margin: .4em 0 1.1875em; font-size: 16px; line-height: 1.625; color: #51545E;">
                          <b>Mohd Arif</b> with <b>SquadMinds Pvt Ltd.</b> has invited you to collaborate with them. Use the button below to set up your account and get started:
                        </p>
                        <table style="width: 100%; margin: 30px auto; text-align: center;" align="center" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td align="center">
                              <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                <tr>
                                  <td align="center">
                                    <a href="${url}" style="background-color: #308d45; border: 10px solid #308d45; display: inline-block; color: #FFF; text-decoration: none; border-radius: 3px; box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16); box-sizing: border-box; font-size: 16px;">Set up account</a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <p style="margin: .4em 0 1.1875em; font-size: 16px; line-height: 1.625; color: #51545E;">
                          If you have any questions about the invitation, you can reply to this email and it will go right to them. Alternatively, feel free to <a href="mailto:{{support_email}}" style="color: #3869D4;">contact our customer success team</a> anytime.
                        </p>
                        <p style="margin: .4em 0 1.1875em; font-size: 16px; line-height: 1.625; color: #51545E;">
                          Welcome aboard,<br>SquadMinds team
                        </p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table style="width: 570px; margin: 0 auto; padding: 0; text-align: center;" align="center" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td style="padding: 45px;" align="center">
                      <p style="font-size: 13px; color: #A8AAAF;">
                        SquadMinds Pvt Ltd<br>E-192 8B.<br>Mohali, Punjab
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

`;
};

module.exports = InvitationLink