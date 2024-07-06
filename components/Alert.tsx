import { useState, useEffect, useRef } from "react";
import { alertService, AlertType } from "@/services";
export { Alert };

const Alert = ({ id = "default-alert", fade = true }: any) => {
  const mounted = useRef(false);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    mounted.current = true;

    const subscription = alertService.onAlert(id).subscribe((alert: any) => {
      if (!alert.message) {
        setAlerts((alerts) => {
          const filteredAlerts = alerts.filter(
            (x: any) => x.keepAfterRouteChange
          );

          // remove 'keepAfterRouteChange' flag on the rest
          return omit(filteredAlerts, "keepAfterRouteChange");
        });
      } else {
        // add alert to array with unique id
        alert.itemId = Math.random();
        setAlerts((alerts: any): any => [...alerts, alert]);

        setTimeout(() => removeAlert(alert), 2000);
      }
    });

    // clear alerts on location change
    const clearAlerts = () => alertService.clear(id);
    // router.events.on("routeChangeStart", clearAlerts);

    // clean up function that runs when the component unmounts
    return () => {
      mounted.current = false;

      // unsubscribe to avoid memory leaks
      subscription.unsubscribe();
      clearAlerts;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function omit(arr: any, key: any) {
    return arr.map((obj: any) => {
      const { [key]: omitted, ...rest } = obj;
      return rest;
    });
  }

  function removeAlert(alert: any) {
    if (!mounted.current) return;

    if (fade) {
      // fade out alert
      setAlerts((alerts: any) =>
        alerts.map((x: any) =>
          x.itemId === alert.itemId ? { ...x, fade: true } : x
        )
      );

      // remove alert after faded out
      setTimeout(() => {
        setAlerts((alerts: any) =>
          alerts.filter((x: any) => x.itemId !== alert.itemId)
        );
      }, 250);
    } else {
      // remove alert
      setAlerts((alerts: any) =>
        alerts.filter((x: any) => x.itemId !== alert.itemId)
      );
    }
  }

  function cssClasses(alert: any) {
    if (!alert) return;

    const classes = ["alert"];

    const alertTypeClass = {
      [AlertType.Success]: "alert-success",
      [AlertType.Error]: "alert-error",
      [AlertType.Info]: "alert-info",
      [AlertType.Warning]: "alert-warning",
    };

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push("fade");
    }

    return classes.join(" ");
  }

  if (!alerts.length) return null;

  return (
    <div className="transition-all space-y-2">
      {alerts.map((alert: any, index: any) => (
        <div
          role="alert"
          key={index}
          className={`animate-[appear_300ms_cubic-bezier(0.4,_0,_0.2,_1)_forwards] ${cssClasses(
            alert
          )}`}
        >
          <a className="btn btn-ghost btn-sm" onClick={() => removeAlert(alert)}>
            &times;
          </a>
          <span dangerouslySetInnerHTML={{ __html: alert.message }}></span>
        </div>
      ))}
    </div>
  );
};
