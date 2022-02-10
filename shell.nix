{ sources ? import ./nix/sources.nix }:
let
  nixpkgs = import sources.nixpkgs { };
  unstable = import sources.unstable { };
in
nixpkgs.mkShell {
    name = "node";
    buildInputs = with nixpkgs; [
        unstable.nodejs-16_x
        niv
        pre-commit
        vscodium
    ];
    shellHook = ''
      ${nixpkgs.pre-commit}/bin/pre-commit install
      
      export PATH="$PWD/node_modules/.bin/:$PATH"
    '';
}

