// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Storage {
    uint256 number = 0; // 이미존재하는 타입

    function store(uint256 num) public {
        number = num;
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     */
    function retrieve() public view returns (uint256){
        
        return number;
        
    }
}

