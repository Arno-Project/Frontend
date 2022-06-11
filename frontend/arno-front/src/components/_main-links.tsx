import React from "react";
import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";
import { MainLinkProps } from "./DashboardNav"

function MainLink({ icon, color, label }: MainLinkProps) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

export function MainLinks({ links }: any) {
  const elements = links.map((link: any) => (
    <MainLink {...link} key={link.label} />
  ));
  return <div>{elements}</div>;
}
