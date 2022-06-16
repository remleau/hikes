import SubHero from "/components/subHero";
import { LayoutContainer } from "/components/layout";
//import Link from "next/link";

import { useData } from "/components/utils/DataContext";
import { useEffect, useState } from "react";

import ListMountains from "/components/listMountains";

export default function () {
  const [mountains, setMountains] = useState(null);
  const { getMountains } = useData();

  useEffect(async () => {
    setMountains(await getMountains());
  }, []);

  return (
    <LayoutContainer pageClasse="settingsPage" api="">
      <SubHero pageTitle="Mountains." />

      <ListMountains hikes={mountains} setHikes={setMountains} />
    </LayoutContainer>
  );
}
