import { useRef} from "react";
import { useNavigate } from "react-router-dom";
import { ThemeIcon, UnstyledButton, Group, Text, useMantineTheme } from "@mantine/core";
import { MainLinkProps } from "./DashboardNav"

function MainLink({ icon, color, label, path }: MainLinkProps) {
  const ref: any = useRef<HTMLButtonElement>();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  
  const handleNavItemClick = () => {
    for (let btn of ref.current.parentNode.children) { // TODO clean up this shit
      btn.style.backgroundColor = theme.white;
    }

    ref.current.style.backgroundColor = theme.colors.gray[1];
    navigate("/dashboard" + path);
    console.log(ref);
  }

  return (
    <UnstyledButton
      ref={ref}
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
      onClick={handleNavItemClick}
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
  return <div id="dashboard-nav-links">{elements}</div>;
}
