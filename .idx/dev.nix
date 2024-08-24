{ pkgs, ... }:
{
  # Define the Nix channel
  channel = "stable-23.11";

  # List the packages you want to include
  packages = [
    pkgs.nodejs_20
    pkgs.nodePackages.pnpm
    pkgs.nodePackages.tailwindcss
    pkgs.nodePackages.postcss
    pkgs.nodePackages.autoprefixer
    # Removed live-server
  ];

  # Set up environment variables if needed
  env = { };

  idx = {
    # Extensions for your workspace
    extensions = [
      "esbenp.prettier-vscode"
      "dbaeumer.vscode-eslint"
      # Removed ritwickdey.LiveServer
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        web = {
          command = [];
          manager = "web";
          env = {
            PORT = "$PORT";
          };
        };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      onCreate = {
        pnpm-install = "pnpm install";
        build-home = "pnpm run build-home";
      };
      onStart = {
        watch-home = "pnpm run build-home";
      };
    };
  };
}
