import { AdminSideBar } from "../../../../Components/AdminSideBar";
import { cn } from "../../../../utilities/classNames";

export const AdminMapView = () => {
  return (
    <div className={cn("flex h-dvh")}>
      <AdminSideBar active="map" />
      <section className={cn("w-full h-full overflow-auto")}></section>
    </div>
  );
};
