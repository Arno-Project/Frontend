import { Navbar } from "@mantine/core";

import {
  GitPullRequest,
  AlertCircle,
  Messages,
  Database,
} from "tabler-icons-react";

import { UserCard } from "./_user";
import { MainLinks } from "./_main-links";
import { Brand } from "./_brand";

export interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  roles: string[];
}

const links: MainLinkProps[] = [
  {
    icon: <GitPullRequest size={16} />,
    color: "blue",
    label: "Pull Requests",
    roles: ["customer"],
  },
  {
    icon: <AlertCircle size={16} />,
    color: "teal",
    label: "Open Issues",
    roles: ["customer"],
  },
  {
    icon: <Messages size={16} />,
    color: "violet",
    label: "Discussions",
    roles: ["customer"],
  },
  {
    icon: <Database size={16} />,
    color: "grape",
    label: "Databases",
    roles: ["customer"],
  },
];

export function DashboardNav({ user }: any) {
  const linkItems: MainLinkProps[] = links.filter((item) =>
    item.roles.includes(user.role)
  );

  return (
    <Navbar p="xs" width={{ base: 300 }}>
      <Navbar.Section mt="xs">
        <Brand />
      </Navbar.Section>
      <Navbar.Section grow mt="md">
        <MainLinks links={linkItems} />
      </Navbar.Section>
      <Navbar.Section>
        <UserCard user={user}/>
      </Navbar.Section>
    </Navbar>
  );
}
