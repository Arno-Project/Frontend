import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { ChevronRight, ChevronLeft } from 'tabler-icons-react';
import { UnstyledButton, Group, Avatar, Text, Box, useMantineTheme } from '@mantine/core';

import { RoleDict } from '../../assets/consts';

export function UserCard({ user }: any) {
    const theme = useMantineTheme();
    const navigate = useNavigate();
    
    const ref: any = useRef<HTMLButtonElement>();
  
    const navigateToEditProfile = () => {
      const navLinks: any = document.getElementById('dashboard-nav-links');

      console.log(ref);
      for (let btn of navLinks.children) {
        btn.style.backgroundColor = theme.white;
      }
  
      navigate("/dashboard/profile");
    }
    
    return (
        <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
      }}
    >
      <UnstyledButton
      ref={ref}
        sx={{
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          },
        }}
        onClick={navigateToEditProfile}
      >
        <Group>
          <Avatar
            src="https://www.pngitem.com/pimgs/m/146-1468843_profile-icon-orange-png-transparent-png.png"
            radius="xl"
          />
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {user.firstName + " " + user.lastName}
            </Text>
            <Text color="dimmed" size="xs">
              {RoleDict[user.role]}
            </Text>
          </Box>

          {theme.dir === 'ltr' ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Group>
      </UnstyledButton>
    </Box>
    );
}
