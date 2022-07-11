import { useEffect, useState } from "react";
import { matchPath, useLocation, useParams } from "react-router-dom";
import RoutePath from "../../routers/Path";
import { getFacebookPageIdByClinicId } from "../../services/teeth-apis/ClinicController";
/*global FB*/
/**
 *
 */
export function init(facebookPageId) {
  console.log("rest");
  var chatbox = document.getElementById("fb-customer-chat");
  chatbox.setAttribute("page_id", facebookPageId); // TODO: move to args
  chatbox.setAttribute("attribution", "biz_inbox");

  window.fbAsyncInit = function () {
    FB.init({
      xfbml: true,
      version: "v11.0",
    });
  };

  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
}

/**
 *
 */
export function cleanup() {
  (function (d, id) {
    var target = d.getElementById(id);
    if (target) {
      target.parentNode.removeChild(target);
    }
  })(document, "facebook-jssdk");

  delete window.FB;
}

export function Facebook() {
  const location = useLocation();
  const params = useParams();

  const [facebookPageId, setFacebookPageId] = useState();

  const fetchFacebookPageId = async () => {
    try {
      const match = matchPath(location.pathname, {
        path: RoutePath.CLINIC_DETAIL_PAGE,
        exact: true,
        strict: false,
      });

      if (!match?.params?.clinicId) {
        setFacebookPageId(null);
        return;
      }

      const { data } = await getFacebookPageIdByClinicId(
        match?.params?.clinicId
      );
      setFacebookPageId(data?.facebookPageId);
    } catch (e) {
      setFacebookPageId(null);
    }
  };

  useEffect(() => {
    fetchFacebookPageId();
  }, [location.pathname]);

  useEffect(() => {
    facebookPageId && init(facebookPageId);
    return () => {
      cleanup();
    };
  }, [facebookPageId]);

  if (!facebookPageId) return null;

  console.log(facebookPageId);

  return (
    <div>
      <div id="fb-root"></div>

      <div id="fb-customer-chat" className="fb-customerchat"></div>
    </div>
  );
}

export default Facebook;
